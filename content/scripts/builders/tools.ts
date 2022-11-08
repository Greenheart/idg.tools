import { getTag, mostRelevantContentFirst } from '$shared/content-utils'
import type {
    Dimension,
    ToolsContent,
    Language,
    Skill,
    Tag,
    Tool,
    Translated,
} from '$shared/types'
import {
    createBackwardsCompatibleLink,
    getContentPaths,
    readJSON,
    writeJSON,
} from '../utils'

// Only used while building the content
type ProcessingTranslatedToolsContent = {
    dimensions: Translated<Dimension>[]
    tools: Translated<Tool>[]
    skills: Translated<Skill>[]
    tags: Translated<Tag>[]
}

const sortNamesAlphabetically = (a: Tag, b: Tag) => a.name.localeCompare(b.name)

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
                    }" and language "${language}": Slugs found was ${JSON.stringify(
                        [...uniqueSlugs],
                    )}`,
                )
            }

            if (!tool.tags) {
                console.warn('[content] MISSING TAGS for tool ', tool.name)
                tool.tags = []
            }

            const firstDuplicateTag = tool.tags.find(
                (t, i) => tool.tags.lastIndexOf(t) !== i,
            )
            if (firstDuplicateTag) {
                throw new Error(
                    `[content] Tool "${tool.name}" has duplicate tags: ${firstDuplicateTag}`,
                )
            }

            const tags = translatedTags.map((tag) => {
                const translatedTag = tag[language as Language]
                if (translatedTag !== undefined) return translatedTag
                throw new Error(
                    `[content] Tag is missing translation for language "${language}": ${JSON.stringify(
                        tag,
                    )}`,
                )
            })

            const tagsSortedAlphabetically = tool.tags
                .map((t) => getTag(t, { tags }))
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

const loadContent = async (
    contentTypes: Array<keyof ToolsContent>,
    contentDir: string,
) => {
    const paths = await getContentPaths(contentTypes, contentDir)
    const content = await Promise.all(
        paths.map((paths) => Promise.all(paths.map(readJSON))),
    )

    return contentTypes.reduce((rawContent, type, i) => {
        rawContent[type] = content[i]
        return rawContent
    }, {} as ProcessingTranslatedToolsContent)
}

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

const splitContentByLang = (
    content: ProcessingTranslatedToolsContent,
    selectedLanguages: Language[],
) =>
    selectedLanguages.reduce<Translated<ToolsContent>>(
        (result, lang: Language) => {
            result[lang] = {
                tools: getByLang(content.tools, lang),
                skills: getByLang(content.skills, lang),
                dimensions: getByLang(content.dimensions, lang),
                // IDEA: Or should tags be sorted by number of tools using them? This would make the popular tags appear first and might give a better UX
                tags: getByLang(content.tags, lang).sort(
                    sortNamesAlphabetically,
                ),
            }
            return result
        },
        {} as Translated<ToolsContent>,
    )

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
                mostRelevantContentFirst(
                    content.skills.map((skill) => skill.id),
                ),
            ),
        }
    }

    return builtContent
}

export default async function buildTools(
    selectedLanguages: Language[],
    contentDir: string,
    outputFile: string,
) {
    const rawContent = await loadContent(
        ['tools', 'skills', 'dimensions', 'tags'],
        contentDir,
    )

    const builtContent = splitContentByLang(
        prepareContent(rawContent, selectedLanguages),
        selectedLanguages,
    )

    const output = orderToolsConsistently(builtContent)

    await writeJSON(outputFile, output)
}
