import { getTag, mostRelevantToolsFirst } from '$shared/content-utils'
import type {
    Dimension,
    ToolsContent,
    Locale,
    Skill,
    Tag,
    Tool,
    Localized,
    ToolsCollections,
} from '$shared/types'
import type { SelectedContent } from 'scripts/old-build-content'
import {
    createBackwardsCompatibleLink,
    getContentPaths,
    readJSON,
    sortNamesAlphabetically,
} from '../utils'

// Only used while building the content
type ProcessingTranslatedToolsContent = {
    dimensions: Localized<Dimension>[]
    tools: Localized<Tool>[]
    skills: Localized<Skill>[]
    tags: Localized<Tag>[]
}

const prepareTools = (
    translatedTools: Localized<Tool>[],
    translatedTags: Localized<Tag>[],
    selectedLocales: Locale[],
) => {
    return translatedTools.map((translatedTool) => {
        const updated = {} as Localized<Tool>

        const uniqueSlugs = new Set()

        for (const [locale, tool] of Object.entries(translatedTool)) {
            if (!selectedLocales.includes(locale as Locale)) continue
            if (!tool.slug) {
                throw new Error(
                    `[content] Missing slug for tool "${tool.name}" and locale "${locale}"`,
                )
            }

            // Ensure slugs are consistent across all translations
            uniqueSlugs.add(tool.slug)
            if (uniqueSlugs.size > 1) {
                throw new Error(
                    `[content] Slugs should be the same for all translations for tool "${
                        tool.name
                    }" and locale "${locale}": Slugs found was ${JSON.stringify([...uniqueSlugs])}`,
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
                const translatedTag = tag[locale as Locale]
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
                .filter((t) => t.score > 30) // Filter out irrelevant skills
                .sort((a, b) => b.score - a.score) // Most relevant first

            if (sortedRelevancyScores.length < tool.relevancy.length) {
                console.warn(
                    `[content] Removed ${
                        tool.relevancy.length - sortedRelevancyScores.length
                    } relevancy scores with <= 30 relevancy from tool "${
                        tool.name
                    }" for locale "${locale}"`,
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

            updated[locale as Locale] = tool
        }

        return updated
    })
}

const prepareTags = (
    translatedTools: Localized<Tool>[],
    translatedTags: Localized<Tag>[],
    selectedLocales: Locale[],
) =>
    translatedTags.filter((translatedTag) => {
        for (const [locale, tag] of Object.entries(translatedTag)) {
            if (!selectedLocales.includes(locale as Locale)) continue
            if (!tag) {
                throw new Error(
                    `[content] Tag is missing translation for locale "${locale}": ${JSON.stringify(
                        translatedTag,
                    )}`,
                )
            }

            const tagIsUsedBySomeTool = translatedTools.some((translatedTool) =>
                translatedTool[locale as Locale]?.tags?.includes?.(tag.id),
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

const loadContent = async (selected: SelectedContent, contentDir: string) => {
    const paths = await getContentPaths(selected, contentDir)

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

function getByLang<T>(content: Localized<T>[], lang: Locale): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

const splitContentByLang = (content: ProcessingTranslatedToolsContent, selectedLocales: Locale[]) =>
    selectedLocales.reduce<Localized<ToolsContent>>((result, lang: Locale) => {
        result[lang] = {
            tools: getByLang(content.tools, lang),
            skills: getByLang(content.skills, lang),
            dimensions: getByLang(content.dimensions, lang),
            // IDEA: Or should tags be sorted by number of tools using them?
            // This would make the popular tags appear first and might give a better UX
            tags: getByLang(content.tags, lang).sort(sortNamesAlphabetically),
        }
        return result
    }, {} as Localized<ToolsContent>)

const prepareContent = (content: ProcessingTranslatedToolsContent, selectedLocales: Locale[]) => {
    const tools = prepareTools(content.tools, content.tags, selectedLocales)
    const tags = prepareTags(tools, content.tags, selectedLocales)
    return { ...content, tools, tags }
}

const orderToolsConsistently = (builtContent: Localized<ToolsContent>) => {
    for (const [locale, content] of Object.entries(builtContent)) {
        builtContent[locale as Locale] = {
            ...content,
            tools: content.tools.sort(
                mostRelevantToolsFirst(content.skills.map((skill) => skill.id)),
            ),
        }
    }

    return builtContent
}

export default async function buildTools(
    selectedLocales: Locale[],
    contentDir: string,
    selectedContent: SelectedContent,
) {
    const rawContent = await loadContent(selectedContent, contentDir)

    // IDEA: Perhaps we could split content by locale first, and then prepare content only for the locales wanted?
    // This would allow to filter out missing content in the beginning and only implement the selectedLocales filering in one place.

    const builtContent = splitContentByLang(
        prepareContent(rawContent, selectedLocales),
        selectedLocales,
    )

    return orderToolsConsistently(builtContent)
}
