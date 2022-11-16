import { getTag } from '$shared/content-utils'
import type {
    Dimension,
    CommunityContent,
    Language,
    Translated,
    Story,
    Contributor,
    Event,
    Tag,
} from '$shared/types'
import {
    createBackwardsCompatibleLink,
    getContentPaths,
    readJSON,
    sortNamesAlphabetically,
    writeJSON,
} from '../utils'

// Only used while building the content
type ProcessingTranslatedCommunityContent = {
    stories: Translated<Story>[]
    events: Translated<Event>[]
    contributors: Translated<Contributor>[]
    dimensions: Translated<Dimension>[]
    tags: Translated<Tag>[]
}

const prepareStories = (
    translatedStories: Translated<Story>[],
    translatedTags: Translated<Tag>[],
    selectedLanguages: Language[],
) => {
    return translatedStories.map((translatedStory) => {
        const updated = {} as Translated<Story>

        // IDEA: Maybe automatically title case story titles

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

            if (!story.tags) {
                console.warn('[content] Missing tags for story', story.title)
                story.tags = []
            }

            // Consider removing duplicate tags check, since this is taken care of by the relation widget in the CMS
            // Or maybe only enable it when running in local development and not in the production build
            const firstDuplicateTag = story.tags.find(
                (t, i) => story.tags.lastIndexOf(t) !== i,
            )
            if (firstDuplicateTag) {
                throw new Error(
                    `[content] Story "${story.title}" has a duplicate tag: ${firstDuplicateTag}`,
                )
            }

            // TODO: If we only load content for each language, this step can be avoided.
            const relevantTags = translatedTags.reduce((relevantTags, tag) => {
                const translatedTag = tag[language as Language]
                if (translatedTag) relevantTags.push(translatedTag)
                return relevantTags
            }, [] as Tag[])

            const tagsSortedAlphabetically = story.tags
                .map((t) => getTag(t, { tags: relevantTags }))
                .sort(sortNamesAlphabetically)
                .map((t) => t.id)

            // IDEA: This could be a shared util used for many content types as long as they use the same Image content type.
            // NOTE: this is for the image as object (or with relation) widget
            // if (
            //     story.image &&
            //     story.image.src.startsWith('/community/static')
            // ) {
            //     // Ensure image URLs will work on the website
            //     story.image.src = story.image.src.replace(
            //         '/community/static',
            //         '',
            //     )
            // }

            // IDEA: This could be a shared util used for many content types as long as they use the same Image content type.
            if (story.image) {
                if (story.image?.startsWith('/community/static')) {
                    // Ensure image URLs will work on the website
                    story.image = story.image.replace('/community/static', '')
                }
            } else {
                console.warn(
                    `[content] Story is missing image "${story.title}"`,
                )
                story.image = ''
            }

            if (story.image && !story.imageAlt) {
                console.warn(
                    `[content] Story is missing alt text: "${story.title}"`,
                )
                story.imageAlt = ''
            }

            story.tags = tagsSortedAlphabetically

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

        // IDEA: Maybe automatically title case event names

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

const prepareTags = (
    translatedStories: Translated<Story>[],
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

            const tagIsUsedBySomeStory = translatedStories.some(
                (translatedStory) =>
                    translatedStory[language as Language]?.tags?.includes?.(
                        tag.id,
                    ),
            )
            if (!tagIsUsedBySomeStory) {
                console.warn(
                    `[content] Tag "${tag.name}" with id "${tag.id}" is not used in any story.`,
                )
                return false
            }
        }
        return true
    }, {})

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
                // IDEA: Or should tags be sorted by number of stories using them?
                // This would make the popular tags appear first and might give a better UX
                tags: getByLang(content.tags, lang).sort(
                    sortNamesAlphabetically,
                ),
            }
            return result
        },
        {} as Translated<CommunityContent>,
    )

const prepareContent = (
    content: ProcessingTranslatedCommunityContent,
    selectedLanguages: Language[],
) => {
    const stories = prepareStories(
        content.stories,
        content.tags,
        selectedLanguages,
    )
    const tags = prepareTags(stories, content.tags, selectedLanguages)
    const events = prepareEvents(content.events, selectedLanguages)
    return { ...content, stories, events, tags }
}

export default async function buildCommunity(
    selectedLanguages: Language[],
    contentDir: string,
    outputFile: string,
) {
    const rawContent = await loadContent(
        ['stories', 'events', 'contributors', 'dimensions', 'tags'],
        contentDir,
    )

    // IDEA: Perhaps we could split content by language first, and then prepare content only for the languages wanted?
    // This would allow to filter out missing content in the beginning and only implement the selectedLanguages filering in one place.

    const builtContent = splitContentByLang(
        prepareContent(rawContent, selectedLanguages),
        selectedLanguages,
    )

    await writeJSON(outputFile, builtContent)
}
