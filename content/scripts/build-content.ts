import FastGlob from 'fast-glob'
import { performance } from 'perf_hooks'

import { LANGUAGE_TAGS } from '../../shared/constants'
import {
    Category,
    Content,
    Language,
    Skill,
    Tag,
    Tool,
    Translated,
    OLD_TranslatedContent,
} from '../../shared/types'
import { createBackwardsCompatibleLink, readJSON, writeJSON } from './utils'

console.log(`⚡ Building IDG.tools content...`)
const startTime = performance.now()

const getContentPaths = (contentTypes: Array<keyof Content>) =>
    Promise.all(contentTypes.map((type) => FastGlob(`./src/${type}/*.json`)))

const prepareSkills = (
    translatedSkills: Translated<Skill>[],
    translatedCategories: Translated<Category>[],
) => {
    return translatedSkills.map((translatedSkill) => {
        const updated = {} as Translated<Skill>

        for (const [language, skill] of Object.entries(translatedSkill)) {
            // Assumes all content is available in English
            const translatedCategory = translatedCategories.find(
                (tc) => tc.en.id === skill.category,
            ) as Translated<Category>

            // Add colors to skills
            skill.color = translatedCategory.en.color
            updated[language as Language] = skill
        }

        return updated
    })
}

const prepareTools = (translatedTools: Translated<Tool>[]) => {
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

            const sorted = tool.relevancy
                .filter((t) => t.score > 0) // Filter out skills with 0 relevancy
                .sort((a, b) => b.score - a.score) // Most relevant first

            if (sorted.length < tool.relevancy.length) {
                console.warn(
                    `[content] Removed ${
                        tool.relevancy.length - sorted.length
                    } relevancy scores with 0 relevancy from tool "${
                        tool.name
                    }" for language "${language}"`,
                )
            }

            tool.relevancy = sorted
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

    return { tools, skills, categories, tags } as OLD_TranslatedContent
}

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map((item) => item[lang])
}

const splitContentByLang = (content: OLD_TranslatedContent) =>
    LANGUAGE_TAGS.reduce<Translated<Content>>((result, lang: Language) => {
        result[lang] = {
            tools: getByLang(content.tools, lang),
            skills: getByLang(content.skills, lang),
            categories: getByLang(content.categories, lang),
            tags: getByLang(content.tags, lang),
        }
        return result
    }, {} as Translated<Content>)

const prepareContent = (content: OLD_TranslatedContent) => {
    return {
        ...content,
        skills: prepareSkills(content.skills, content.categories),
        tools: prepareTools(content.tools),
    }
}

const rawContent = await loadContent(['tools', 'skills', 'categories', 'tags'])

const builtContent = splitContentByLang(prepareContent(rawContent))

console.log(`Building IDG.tools content...`)

await writeJSON('./compiled/built-content.json', builtContent, 2)

const buildTime = ((performance.now() - startTime) / 1000).toLocaleString(
    'en-US',
    {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    },
)
console.log(`✅ Finished in ${buildTime} s\n`)
