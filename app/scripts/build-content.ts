import slugify from 'slugify'
import FastGlob from 'fast-glob'
import { performance } from 'perf_hooks'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises'

import { DEFAULT_LANGUAGE_TAG, LANGUAGE_TAGS } from '$shared/constants'
import { getTag } from '$shared/content-utils'
import type {
    Category,
    Content,
    Language,
    Skill,
    Tag,
    Tool,
    Translated,
} from '$shared/types'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const slugifyName = (string: string, language = DEFAULT_LANGUAGE_TAG) =>
    slugify(string, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        locale: language, // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    })

/**
 * Create a slugified, backwards compatible link.
 *
 * @param name Name of the object to link to. Can be updated easily while keeping links backwards compatible.
 * @param uniqueSlug cuid.slug() that should remain the same for an object as long as it exists in the database.
 * @returns Slugified link
 */
export const createBackwardsCompatibleLink = (
    name: string,
    uniqueSlug: string,
    language = DEFAULT_LANGUAGE_TAG,
) => `${slugifyName(name, language)}-${uniqueSlug}`

export const readJSON = (path: string) =>
    readFile(path, { encoding: 'utf-8' }).then(JSON.parse)

export const writeJSON = (path: string, data: any, indentation: number = 0) =>
    writeFile(path, JSON.stringify(data, null, indentation), {
        encoding: 'utf-8',
    })

// Only used while building the content
type ProcessingTranslatedContent = {
    categories: Translated<Category>[]
    tools: Translated<Tool>[]
    skills: Translated<Skill>[]
    tags: Translated<Tag>[]
}

console.log(`2. ⚡ Building IDG.tools content...`)
const startTime = performance.now()

const getContentPaths = (contentTypes: Array<keyof Content>) =>
    Promise.all(
        contentTypes.map((type) =>
            FastGlob(resolve(__dirname, `../../../content/src/${type}/*.json`)),
        ),
    )

const prepareSkills = (
    translatedSkills: Translated<Skill>[],
    translatedCategories: Translated<Category>[],
) => {
    return translatedSkills.map((translatedSkill) => {
        const updated = {} as Translated<Skill>

        for (const [language, skill] of Object.entries(translatedSkill)) {
            // Assumes all content is available in English
            const translatedCategory = translatedCategories.find(
                (tc) => tc!.en!.id === skill.category,
            ) as Translated<Category>

            // Add colors to skills
            skill.color = translatedCategory!.en!.color
            updated[language as Language] = skill
        }

        return updated
    })
}

const prepareTools = (
    translatedTools: Translated<Tool>[],
    translatedTags: Translated<Tag>[],
) => {
    return translatedTools.map((translatedTool) => {
        const updated = {} as Translated<Tool>

        const uniqueSlugs = new Set()

        for (const [language, tool] of Object.entries(translatedTool)) {
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
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((t) => t.id)

            tool.tags = tagsSortedAlphabetically

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
                console.warn(
                    `[content] Link has changed for tool "${tool.name}" from old: "${tool.link}" to new: "${newLink}"`,
                )
                tool.link = newLink
            }

            updated[language as Language] = tool
        }

        return updated
    })
}

const loadContent = async (contentTypes: Array<keyof Content>) => {
    const paths = await getContentPaths(contentTypes)

    const [tools, skills, categories, tags] = await Promise.all(
        paths.map((paths) => Promise.all(paths.map(readJSON))),
    )

    return { tools, skills, categories, tags } as ProcessingTranslatedContent
}

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

const splitContentByLang = (
    content: ProcessingTranslatedContent,
    selectedLanguages: Language[] = LANGUAGE_TAGS,
) =>
    selectedLanguages.reduce<Translated<Content>>((result, lang: Language) => {
        result[lang] = {
            tools: getByLang(content.tools, lang),
            skills: getByLang(content.skills, lang),
            categories: getByLang(content.categories, lang),
            tags: getByLang(content.tags, lang),
        }
        return result
    }, {} as Translated<Content>)

const prepareContent = (content: ProcessingTranslatedContent) => {
    return {
        ...content,
        skills: prepareSkills(content.skills, content.categories),
        tools: prepareTools(content.tools, content.tags),
    }
}

const rawContent = await loadContent(['tools', 'skills', 'categories', 'tags'])

// NOTE: We currently only build the English content since no translations are available yet
const builtContent = splitContentByLang(prepareContent(rawContent), ['en'])

console.log(`Building IDG.tools content...`)

await writeJSON(resolve(__dirname, '../../static/content.json'), builtContent)

const buildTime = ((performance.now() - startTime) / 1000).toLocaleString(
    'en-US',
    {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    },
)
console.log(`✅ Finished in ${buildTime} s\n`)
