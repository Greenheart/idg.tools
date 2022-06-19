import FastGlob from 'fast-glob'
import { performance } from 'perf_hooks'

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

// IDEA: Maybe generate slugs and links for entries before build

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
                uniqueSlugs.values()
                throw new Error(
                    `[content] Slugs should be the same for all translations for tool "${
                        tool.name
                    }" and language "${language}": Slugs found was ${JSON.stringify(
                        [...uniqueSlugs],
                    )}`,
                )
            }

            // Filter out skills with 0 relevancy
            const sorted = tool.relevancy
                .filter((t) => t.score > 0)
                .sort((a, b) => b.score - a.score)

            if (sorted.length < tool.relevancy.length) {
                console.log(
                    `Removed ${
                        tool.relevancy.length - sorted.length
                    } relevancy scores from tool "${
                        tool.name
                    }" for language "${language}"`,
                )
            }

            tool.relevancy = sorted
            tool.link = createBackwardsCompatibleLink(tool.name, tool.slug)

            updated[language as Language] = tool
        }

        return updated
    })
}

// TODO: consider working with content in top-level language namespaces with one JSON object per language, instead of translations within each object
// This could make sorting, filtering and working with content easier in general.

const loadContent = async (contentTypes: Array<keyof Content>) => {
    const paths = await getContentPaths(contentTypes)
    const [tools, skills, categories, tags] = await Promise.all(
        paths.map((paths) => Promise.all(paths.map(readJSON))),
    )

    return {
        tools: prepareTools(tools),
        skills: prepareSkills(skills, categories),
        categories,
        tags,
    } as OLD_TranslatedContent
}
/*

const getByLang = (obj: Translated)

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map(item => item[lang])
}

const translatedContent = LANGUAGES.reduce(result, lang => {
    result[lang] = {
        tools: getByLang(tools, lang),
        skills: getByLang(skills, lang),
        categories: getByLang(categories, lang),
        tags: getByLang(tags, lang),
    }
    return result
}, {})

*/

const prepareContent = (content: OLD_TranslatedContent) => {}

const rawContent = await loadContent(['tools', 'skills', 'categories', 'tags'])

console.log(`Building IDG.tools content...`)

await writeJSON('./compiled/built-content.json', rawContent, 2)

const buildTime = ((performance.now() - startTime) / 1000).toLocaleString(
    'en-US',
    {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    },
)
console.log(`✅ Finished in ${buildTime} s\n`)
