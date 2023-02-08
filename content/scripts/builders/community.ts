import { getSortedStories, getTag } from '$shared/content-utils'
import type {
    CommunityContent,
    Locale,
    Localized,
    Story,
    Tag,
    CommunityCollections,
} from '$shared/types'
import type { SelectedContent, SingletonName } from 'scripts/old-build-content'
import {
    createBackwardsCompatibleLink,
    getConsistentAssetURL,
    getContentPaths,
    readJSON,
    sortNamesAlphabetically,
} from '../utils'

const prepareStories = (stories: Story[], tags: Tag[], locale: Locale) => {
    const uniqueSlugs = new Set()

    return stories
        .map((story) => {
            if (!story.publishedAt) {
                console.log('[content] Skipping unpublished story', story.title)
                return null
            }
            if (!story.slug) {
                throw new Error(
                    `[content] Missing slug for story "${story.title}" and locale "${locale}"`,
                )
            }

            // Ensure slugs are consistent across all translations
            uniqueSlugs.add(story.slug)
            if (uniqueSlugs.size > 1) {
                throw new Error(
                    `[content] Slugs should be the same for all translations for story "${
                        story.title
                    }" and locale "${locale}": Slugs found was ${JSON.stringify([...uniqueSlugs])}`,
                )
            }

            if (!story.tags) {
                console.warn('[content] Missing tags for story', story.title)
                story.tags = []
            }

            // Consider removing duplicate tags check, since this is taken care of by the relation widget in the CMS
            // Or maybe only enable it when running in local development and not in the production build
            const firstDuplicateTag = story.tags.find((t, i) => story.tags.lastIndexOf(t) !== i)
            if (firstDuplicateTag) {
                throw new Error(
                    `[content] Story "${story.title}" has a duplicate tag: ${firstDuplicateTag}`,
                )
            }

            const tagsSortedAlphabetically = story.tags
                .map((t) => getTag(t, { tags }))
                .sort(sortNamesAlphabetically)
                .map((t) => t.id)

            story.image = getConsistentAssetURL(story.image, '/community/static')

            story.tags = tagsSortedAlphabetically

            const newLink = createBackwardsCompatibleLink(story.title, story.slug)
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

            return story
        })
        .filter(Boolean) as Story[]
}

const prepareTags = (
    translatedStories: Localized<Story>[],
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

            const tagIsUsedBySomeStory = translatedStories.some((translatedStory) =>
                translatedStory[locale as Locale]?.tags?.includes?.(tag.id),
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

const loadContent = async (selected: SelectedContent, contentDir: string, locale: Locale) => {
    const paths = await getContentPaths(selected, contentDir, locale)

    const [collectionsByType, singletonsByType] = await Promise.all([
        Promise.all(paths.collections.map((collection) => Promise.all(collection.map(readJSON)))),
        Promise.all(paths.singletons.map(readJSON)),
    ])
    console.log({ paths, collectionsByType, singletonsByType })

    const rawContent = {} as CommunityContent

    ;(selected.collections as CommunityCollections).forEach((contentType, i) => {
        rawContent[contentType] = collectionsByType[i]
    })
    ;(selected.singletons as SingletonName[]).forEach((contentType, i) => {
        rawContent[contentType] = singletonsByType[i]
    })

    return rawContent
}

const prepareContent = (content: CommunityContent, locale: Locale) => {
    const stories = prepareStories(content.stories, content.tags, locale)
    const tags = prepareTags(stories, content.tags)

    const result = {
        stories: getSortedStories(stories, content.featured),
        contributors: content.contributors,
        dimensions: content.dimensions,
        // IDEA: Or should tags be sorted by number of stories using them?
        // This would make the popular tags appear first and might give a better UX
        tags: tags.sort(sortNamesAlphabetically),
        featured: content.featured,
    }
    return { ...content, stories, tags }
}

export default async function buildCommunity(
    selectedLocales: Locale[],
    contentDir: string,
    selectedContent: SelectedContent,
) {
    // IDEA: Perhaps we could split content by locale first, and then prepare content only for the locales wanted?
    // This would allow to filter out missing content in the beginning and only implement the selectedLocales filering in one place.

    // TODO: this could be simplified to keep the complexity of multiple locales only at the top level
    // for locale of locales
    //     loadContent()
    //     prepareContent()
    // add it all together into the final content.json output.

    const result: Localized<CommunityContent> = {}

    for (const locale of selectedLocales) {
        result[locale] = await loadContent(selectedContent, contentDir, locale)
    }

    for (const locale of selectedLocales) {
        result[locale] = prepareContent(result[locale], locale)
    }

    // IDEA: Maybe in the future, we should split the content bundle into one bundle per locale to reduce network usage
    // However, this also introduces other complexity with fallback locales, and using SSR to give users the right locale when they visit pages.
}
