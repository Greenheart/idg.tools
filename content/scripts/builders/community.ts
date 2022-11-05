import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

import { LANGUAGE_TAGS } from '$shared/constants'
import type {
    Dimension,
    CommunityContent,
    Language,
    Translated,
    Story,
    Contributor,
} from '$shared/types'
import {
    createBackwardsCompatibleLink,
    getContentPaths,
    readJSON,
    writeJSON,
} from '../utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Only used while building the content
type ProcessingTranslatedCommunityContent = {
    stories: Translated<Story>[]
    contributors: Translated<Contributor>[]
    dimensions: Translated<Dimension>[]
}

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
    const paths = await getContentPaths(contentTypes, __dirname)

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

await writeJSON(
    resolve(__dirname, '../../../../community/static/content.json'),
    builtContent,
)
