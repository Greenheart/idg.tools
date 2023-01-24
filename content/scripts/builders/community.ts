import { getSortedStories, getTag } from '$shared/content-utils'
import type {
    Dimension,
    CommunityContent,
    Locale,
    Translated,
    Story,
    Contributor,
    Tag,
    CommunityCollections,
    FeaturedContent,
} from '$shared/types'
import type { SelectedCollections, SingletonName } from 'scripts/build-content'
import {
    createBackwardsCompatibleLink,
    getConsistentAssetURL,
    getContentPaths,
    readJSON,
    sortNamesAlphabetically,
} from '../utils'

// Only used while building the content
type ProcessingTranslatedCommunityContent = {
    stories: Translated<Story>[]
    contributors: Translated<Contributor>[]
    dimensions: Translated<Dimension>[]
    tags: Translated<Tag>[]
    featured: Translated<FeaturedContent>
}

const prepareStories = (stories: Story[], tags: Tag[], locale: Locale) => {
    const uniqueSlugs = new Set()

    return stories.map((story) => {
        // IDEA: Maybe automatically title case story titles

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
}

const prepareTags = (
    translatedStories: Translated<Story>[],
    translatedTags: Translated<Tag>[],
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

const loadContent = async (selected: SelectedCollections, baseDir: string, locale: Locale) => {
    const paths = await getContentPaths(selected, baseDir, locale)

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

function getByLang<T>(content: Translated<T>[], lang: Locale): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

function getSingletonByLang<T>(content: Translated<T>, lang: Locale): T {
    return content[lang] as T
}

const splitContentByLang = (
    content: ProcessingTranslatedCommunityContent,
    selectedLocales: Locale[],
) =>
    selectedLocales.reduce<Translated<CommunityContent>>((result, lang: Locale) => {
        const featured = getSingletonByLang(content.featured, lang)
        const sortedStories = getSortedStories(getByLang(content.stories, lang), featured)

        result[lang] = {
            stories: sortedStories,
            contributors: content.contributors as Contributor[],
            dimensions: getByLang(content.dimensions, lang),
            // IDEA: Or should tags be sorted by number of stories using them?
            // This would make the popular tags appear first and might give a better UX
            tags: getByLang(content.tags, lang).sort(sortNamesAlphabetically),
            featured,
        }
        return result
    }, {} as Translated<CommunityContent>)

const prepareContent = (content: CommunityContent, locale: Locale) => {
    const stories = prepareStories(content.stories, content.tags)
    const tags = prepareTags(stories, content.tags, selectedLocales)
    return { ...content, stories, tags }
}

export default async function buildCommunity(
    selectedLocales: Locale[],
    contentDir: string,
    selectedCollections: SelectedCollections,
) {
    // IDEA: Perhaps we could split content by locale first, and then prepare content only for the locales wanted?
    // This would allow to filter out missing content in the beginning and only implement the selectedLocales filering in one place.

    // TODO: this could be simplified to keep the complexity of multiple locales only at the top level
    // for locale of locales
    //     loadContent()
    //     prepareContent()
    // add it all together into the final content.json output.

    const result: Translated<CommunityContent> = {}

    for (const locale of selectedLocales) {
        const rawContent = await loadContent(selectedCollections, contentDir, locale)
        result[locale] = prepareContent(rawContent, locale)
    }

    // IDEA: Maybe in the future, we should split the content bundle into one bundle per locale to reduce network usage
    // However, this also introduces other complexity with fallback locales, and using SSR to give users the right locale when they visit pages.
}
