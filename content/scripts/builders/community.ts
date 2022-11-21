import { getTag } from '$shared/content-utils'
import type {
    Dimension,
    CommunityContent,
    Language,
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
    sortByPublishingDate,
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
                    }" and language "${language}": Slugs found was ${JSON.stringify([
                        ...uniqueSlugs,
                    ])}`,
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

            updated[language as Language] = story
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

            const tagIsUsedBySomeStory = translatedStories.some((translatedStory) =>
                translatedStory[language as Language]?.tags?.includes?.(tag.id),
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

const loadContent = async (selected: SelectedCollections, baseDir: string) => {
    const paths = await getContentPaths(selected, baseDir)

    const [collectionsByType, singletonsByType] = await Promise.all([
        Promise.all(paths.collections.map((collection) => Promise.all(collection.map(readJSON)))),
        Promise.all(paths.singletons.map(readJSON)),
    ])

    const rawContent = {} as ProcessingTranslatedCommunityContent

    ;(selected.collections as CommunityCollections).forEach((contentType, i) => {
        rawContent[contentType] = collectionsByType[i]
    })
    ;(selected.singletons as SingletonName[]).forEach((contentType, i) => {
        rawContent[contentType] = singletonsByType[i]
    })

    return rawContent
}

function getByLang<T>(content: Translated<T>[], lang: Language): T[] {
    return content.map((item) => item[lang]).filter(Boolean) as T[]
}

function getSingletonByLang<T>(content: Translated<T>, lang: Language): T {
    return content[lang] as T
}

const showFeaturedFirstAndThenByPublishingDate =
    (featured: FeaturedContent) => (a: Story, b: Story) => {
        const aFeatured = featured.stories.includes(a.id)
        const bFeatured = featured.stories.includes(b.id)
        if (aFeatured && bFeatured) {
            // Preserve featured order controlled by the CMS
            return featured.stories.indexOf(a.id) < featured.stories.indexOf(b.id) ? -1 : 1
        } else if (aFeatured) {
            return -1
        } else if (bFeatured) {
            return 1
        }
        return sortByPublishingDate(a, b)
    }

const splitContentByLang = (
    content: ProcessingTranslatedCommunityContent,
    selectedLanguages: Language[],
) =>
    selectedLanguages.reduce<Translated<CommunityContent>>((result, lang: Language) => {
        const featured = getSingletonByLang(content.featured, lang)
        result[lang] = {
            stories: getByLang(content.stories, lang).sort(
                showFeaturedFirstAndThenByPublishingDate(featured),
            ),
            contributors: content.contributors as Contributor[],
            dimensions: getByLang(content.dimensions, lang),
            // IDEA: Or should tags be sorted by number of stories using them?
            // This would make the popular tags appear first and might give a better UX
            tags: getByLang(content.tags, lang).sort(sortNamesAlphabetically),
            featured,
        }
        return result
    }, {} as Translated<CommunityContent>)

const prepareContent = (
    content: ProcessingTranslatedCommunityContent,
    selectedLanguages: Language[],
) => {
    const stories = prepareStories(content.stories, content.tags, selectedLanguages)
    const tags = prepareTags(stories, content.tags, selectedLanguages)
    return { ...content, stories, tags }
}

export default async function buildCommunity(
    selectedLanguages: Language[],
    contentDir: string,
    selectedCollections: SelectedCollections,
) {
    const rawContent = await loadContent(selectedCollections, contentDir)

    // IDEA: Perhaps we could split content by language first, and then prepare content only for the languages wanted?
    // This would allow to filter out missing content in the beginning and only implement the selectedLanguages filering in one place.

    return splitContentByLang(prepareContent(rawContent, selectedLanguages), selectedLanguages)
}
