import { getTag, mostRelevantToolsFirst } from '$shared/content-utils'
import type {
    Dimension,
    ToolsContent,
    Language,
    Skill,
    Tag,
    Tool,
    Translated,
    ToolsCollections,
} from '$shared/types'
import type { SelectedCollections } from 'scripts/build-content'
import {
    createBackwardsCompatibleLink,
    getContentPaths,
    readJSON,
    sortNamesAlphabetically,
} from '../utils'

// Only used while building the content
type ProcessingTranslatedToolsContent = {
    dimensions: Translated<Dimension>[]
    tools: Translated<Tool>[]
    skills: Translated<Skill>[]
    tags: Translated<Tag>[]
}

const prepareTools = (
    translatedTools: Translated<Tool>[],
    translatedTags: Translated<Tag>[],
    selectedLanguages: Language[],
) => {
    return translatedTools.map((translatedTool) => {
        const updated = {} as Translated<Tool>

        const uniqueSlugs = new Set()

        for (const [language, tool] of Object.entries(translatedTool)) {
            if (!selectedLanguages.includes(language as Language)) continue
            if (!tool.slug) {
                throw new Error(
                    `[content] Missing slug for tool "${tool.name}" and language "${language}"`,
                )
            }

            // Ensure slugs are consistent across all translations
            uniqueSlugs.add(tool.slug)
            if (uniqueSlugs.size > 1) {
                throw new Error(
                    `[content] Slugs should be the same for all translations for tool "${
                        tool.name
                    }" and language "${language}": Slugs found was ${JSON.stringify([
                        ...uniqueSlugs,
                    ])}`,
                )
            }

            if (!tool.tags) {
                console.warn('[content] Missing tags for tool', tool.name)
                tool.tags = []
            }

            // Consider removing duplicate tags check, since this is taken care of by the relation widget in the CMS
            // Or maybe only enable it when running in local development and not in the production build
            const firstDuplicateTag = tool.tags.find((t, i) => tool.tags.lastIndexOf(t) !== i)
            if (firstDuplicateTag) {
                throw new Error(
                    `[content] Tool "${tool.name}" has a duplicate tag: ${firstDuplicateTag}`,
                )
            }

            const relevantTags = translatedTags.reduce((relevantTags, tag) => {
                const translatedTag = tag[language as Language]
                if (translatedTag) relevantTags.push(translatedTag)
                return relevantTags
            }, [] as Tag[])

            const tagsSortedAlphabetically = tool.tags
                .map((t) => getTag(t, { tags: relevantTags }))
                .sort(sortNamesAlphabetically)
                .map((t) => t.id)

            tool.tags = tagsSortedAlphabetically

            if (!tool.relevancy) tool.relevancy = []

            const sortedRelevancyScores = tool.relevancy
                .filter((t) => t.score > 0) // Filter out skills with 0 relevancy
                .sort((a, b) => b.score - a.score) // Most relevant first

            if (sortedRelevancyScores.length < tool.relevancy.length) {
                console.warn(
                    `[content] Removed ${
                        tool.relevancy.length - sortedRelevancyScores.length
                    } relevancy scores with 0 relevancy from tool "${
                        tool.name
                    }" for language "${language}"`,
                )
            }

            tool.relevancy = sortedRelevancyScores
            const newLink = createBackwardsCompatibleLink(tool.name, tool.slug)
            if (newLink !== tool.link) {
                if (tool.link !== undefined) {
                    console.warn(
                        `[content] Link has changed for tool "${tool.name}" from old: "${tool.link}" to new: "${newLink}"`,
                    )
                }
                tool.link = newLink
            }

            updated[language as Language] = tool
        }

        return updated
    })
}

const prepareTags = (
    translatedTools: Translated<Tool>[],
    translatedTags: Translated<Tag>[],
    selectedLanguages: Language[],
) =>
    translatedTags.filter((translatedTag) => {
        for (const [language, tag] of Object.entries(translatedTag)) {
            if (!selectedLanguages.includes(language as Language)) continue
            if (!tag) {
                throw new Error(
                    `[content] Tag is missing translation for language "${language}": ${JSON.stringify(
                        translatedTag,
                    )}`,
                )
            }

            const tagIsUsedBySomeTool = translatedTools.some((translatedTool) =>
                translatedTool[language as Language]?.tags?.includes?.(tag.id),
            )
            if (!tagIsUsedBySomeTool) {
                console.warn(
                    `[content] Tag "${tag.name}" with id "${tag.id}" is not used in any tool.`,
                )
                return false
            }
        }
        return true
    }, {})

const loadContent = async (selected: SelectedCollections, baseDir: string) => {
    const paths = await getContentPaths(selected, baseDir)

    const [
        collectionsByType,
        // singletonsByType
    ] = await Promise.all([
        Promise.all(paths.collections.map((collection) => Promise.all(collection.map(readJSON)))),
        // Promise.all(paths.singletons.map((singleton) => Promise.all(singleton.map(readJSON)))),
    ])

    const rawContent = {} as ProcessingTranslatedToolsContent

    ;(selected.collections as ToolsCollections).forEach((contentType, i) => {
        rawContent[contentType] = collectionsByType[i]
    })
    // ;(selected.singletons).forEach((contentType, i) => {
    //     rawContent[contentType] = singletonsByType[i]
    // })

    return rawContent
}

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

const splitContentByLang = (
    content: ProcessingTranslatedToolsContent,
    selectedLanguages: Language[],
) =>
    selectedLanguages.reduce<Translated<ToolsContent>>((result, lang: Language) => {
        result[lang] = {
            tools: getByLang(content.tools, lang),
            skills: getByLang(content.skills, lang),
            dimensions: getByLang(content.dimensions, lang),
            // IDEA: Or should tags be sorted by number of tools using them?
            // This would make the popular tags appear first and might give a better UX
            tags: getByLang(content.tags, lang).sort(sortNamesAlphabetically),
        }
        return result
    }, {} as Translated<ToolsContent>)

const prepareContent = (
    content: ProcessingTranslatedToolsContent,
    selectedLanguages: Language[],
) => {
    const tools = prepareTools(content.tools, content.tags, selectedLanguages)
    const tags = prepareTags(tools, content.tags, selectedLanguages)
    return { ...content, tools, tags }
}

const orderToolsConsistently = (builtContent: Translated<ToolsContent>) => {
    for (const [language, content] of Object.entries(builtContent)) {
        builtContent[language as Language] = {
            ...content,
            tools: content.tools.sort(
                mostRelevantToolsFirst(content.skills.map((skill) => skill.id)),
            ),
        }
    }

    return builtContent
}

export default async function buildTools(
    selectedLanguages: Language[],
    contentDir: string,
    selectedCollections: SelectedCollections,
) {
    const rawContent = await loadContent(selectedCollections, contentDir)

    // IDEA: Perhaps we could split content by language first, and then prepare content only for the languages wanted?
    // This would allow to filter out missing content in the beginning and only implement the selectedLanguages filering in one place.

    const builtContent = splitContentByLang(
        prepareContent(rawContent, selectedLanguages),
        selectedLanguages,
    )

    return orderToolsConsistently(builtContent)
}
