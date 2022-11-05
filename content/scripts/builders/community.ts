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

const loadContent = async (
    contentTypes: Array<keyof CommunityContent>,
    contentDir: string,
) => {
    const paths = await getContentPaths(contentTypes, contentDir)

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
    selectedLanguages: Language[],
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
    selectedLanguages: Language[],
) => {
    const stories = prepareStories(content.stories, selectedLanguages)
    return { ...content, stories }
}

export default async function buildCommunity(
    selectedLanguages: Language[],
    contentDir: string,
    outputFile: string,
) {
    const rawContent = await loadContent(
        ['stories', 'contributors', 'dimensions'],
        contentDir,
    )

    const builtContent = splitContentByLang(
        prepareContent(rawContent, selectedLanguages),
        selectedLanguages,
    )

    await writeJSON(outputFile, builtContent)
}
