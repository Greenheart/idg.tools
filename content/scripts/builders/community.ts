import type {
    Dimension,
    CommunityContent,
    Language,
    Translated,
    Story,
    Contributor,
    Event,
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
    events: Translated<Event>[]
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

const prepareEvents = (
    translatedEvents: Translated<Event>[],
    selectedLanguages: Language[],
) => {
    return translatedEvents.map((translatedEvent) => {
        const updated = {} as Translated<Event>

        const uniqueSlugs = new Set()

        for (const [language, event] of Object.entries(translatedEvent)) {
            if (!selectedLanguages.includes(language as Language)) continue
            if (!event.slug) {
                throw new Error(
                    `[content] Missing slug for event "${event.name}" and language "${language}"`,
                )
            }

            // Ensure slugs are consistent across all translations
            uniqueSlugs.add(event.slug)
            if (uniqueSlugs.size > 1) {
                throw new Error(
                    `[content] Slugs should be the same for all translations for event "${
                        event.name
                    }" and language "${language}": Slugs found was ${JSON.stringify(
                        [...uniqueSlugs],
                    )}`,
                )
            }

            const newLink = createBackwardsCompatibleLink(
                event.name,
                event.slug,
            )
            if (newLink !== event.link) {
                if (event.link !== undefined) {
                    console.warn(
                        `[content] Link has changed for event "${event.name}" from old: "${event.link}" to new: "${newLink}"`,
                    )
                }
                event.link = newLink
            }

            if (!event.dimensions) event.dimensions = []

            updated[language as Language] = event
        }

        return updated
    })
}

const loadContent = async (
    contentTypes: Array<keyof CommunityContent>,
    contentDir: string,
) => {
    const paths = await getContentPaths(contentTypes, contentDir)
    const content = await Promise.all(
        paths.map((paths) => Promise.all(paths.map(readJSON))),
    )

    return contentTypes.reduce((rawContent, type, i) => {
        rawContent[type] = content[i]
        return rawContent
    }, {} as ProcessingTranslatedCommunityContent)
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
                events: getByLang(content.events, lang),
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
    const events = prepareEvents(content.events, selectedLanguages)
    return { ...content, stories, events }
}

export default async function buildCommunity(
    selectedLanguages: Language[],
    contentDir: string,
    outputFile: string,
) {
    const rawContent = await loadContent(
        ['stories', 'events', 'contributors', 'dimensions'],
        contentDir,
    )

    const builtContent = splitContentByLang(
        prepareContent(rawContent, selectedLanguages),
        selectedLanguages,
    )

    await writeJSON(outputFile, builtContent)
}
