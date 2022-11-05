import slugify from 'slugify'
import FastGlob from 'fast-glob'
import { performance } from 'perf_hooks'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFile, writeFile } from 'fs/promises'

import { DEFAULT_LANGUAGE_TAG, LANGUAGE_TAGS } from '$shared/constants'
import type {
    Dimension,
    CommunityContent,
    Language,
    Tag,
    Translated,
    Story,
    Contributor,
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
type ProcessingTranslatedCommunityContent = {
    stories: Translated<Story>[]
    contributors: Translated<Contributor>[]
    dimensions: Translated<Dimension>[]
}

const startTime = performance.now()

const getContentPaths = (contentTypes: Array<keyof CommunityContent>) =>
    Promise.all(
        contentTypes.map((type) =>
            FastGlob(resolve(__dirname, `../../../content/src/${type}/*.json`)),
        ),
    )

const prepareStories = (
    translatedStories: Translated<Story>[],
    selectedLanguages: Language[],
) => {
    return translatedStories.map((translatedStory) => {
        const updated = {} as Translated<Story>

        const uniqueSlugs = new Set()

        for (const [language, story] of Object.entries(translatedStory)) {
            if (!selectedLanguages.includes(language as Language)) continue
            if (!story.slug) {
                throw new Error(
                    `[content] Missing slug for story "${story.title}" and language "${language}"`,
                )
            }

            // Ensure slugs are consistent across all translations
            uniqueSlugs.add(story.slug)
            if (uniqueSlugs.size > 1) {
                throw new Error(
                    `[content] Slugs should be the same for all translations for story "${
                        story.title
                    }" and language "${language}": Slugs found was ${JSON.stringify(
                        [...uniqueSlugs],
                    )}`,
                )
            }

            const newLink = createBackwardsCompatibleLink(
                story.title,
                story.slug,
            )
            if (newLink !== story.link) {
                if (story.link !== undefined) {
                    console.warn(
                        `[content] Link has changed for story "${story.title}" from old: "${story.link}" to new: "${newLink}"`,
                    )
                }
                story.link = newLink
            }

            if (!story.contributors) story.contributors = []
            if (!story.dimensions) story.dimensions = []

            updated[language as Language] = story
        }

        return updated
    })
}

const loadContent = async (contentTypes: Array<keyof CommunityContent>) => {
    const paths = await getContentPaths(contentTypes)

    const [stories, contributors, dimensions] = await Promise.all(
        paths.map((paths) => Promise.all(paths.map(readJSON))),
    )

    return {
        stories,
        contributors,
        dimensions,
    } as ProcessingTranslatedCommunityContent
}

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

const splitContentByLang = (
    content: ProcessingTranslatedCommunityContent,
    selectedLanguages: Language[] = LANGUAGE_TAGS,
) =>
    selectedLanguages.reduce<Translated<CommunityContent>>(
        (result, lang: Language) => {
            result[lang] = {
                stories: getByLang(content.stories, lang),
                contributors: content.contributors as Contributor[],
                dimensions: getByLang(content.dimensions, lang),
            }
            return result
        },
        {} as Translated<CommunityContent>,
    )

const prepareContent = (
    content: ProcessingTranslatedCommunityContent,
    selectedLanguages: Language[] = LANGUAGE_TAGS,
) => {
    const stories = prepareStories(content.stories, selectedLanguages)
    return { ...content, stories }
}

const rawContent = await loadContent(['stories', 'contributors', 'dimensions'])

const SELECTED_LANGUAGES: Language[] = ['en']

// NOTE: We currently only build the English content since no translations are available yet
// IDEA: Maybe refactor this to only pass in selected languages at one place, but this works for now.
const builtContent = splitContentByLang(
    prepareContent(rawContent, SELECTED_LANGUAGES),
    SELECTED_LANGUAGES,
)

await writeJSON(resolve(__dirname, '../../static/content.json'), builtContent)

const buildTime = ((performance.now() - startTime) / 1000).toLocaleString(
    'en-US',
    {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    },
)
console.log(`✅ Built IDG.community content in ${buildTime} s\n`)
