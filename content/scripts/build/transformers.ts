import { getSortedStories, getTag, mostRelevantToolsFirst } from '$shared/content-utils'
import type { FeaturedContent, Locale, Localised, Skill, Story, Tag, Tool } from '$shared/types'
import {
    createBackwardsCompatibleLink,
    getConsistentAssetURL,
    getTagsSortedAlphabetically,
} from '../utils'

/**
 * Apply a given localeTransformer callback to process the content of each locale.
 * Returns the new content after all locales have been transformed.
 */
export function transformContent<T>(
    localisedContent: Localised<T>,
    localeTransformer: (result: Localised<T>, [locale, content]: [Locale, T]) => Localised<T>,
) {
    return Object.entries(localisedContent).reduce<Localised<T>>(
        localeTransformer as (result: Localised<T>, [locale, content]: [string, T]) => Localised<T>,
        {},
    )
}

/**
 * Run all content transformations, passing the result forward until we get a final result.
 */
export function runAllTransformers<T>(fns: ((content: T) => T)[], initialValue: T) {
    return fns.reduce((prevResult, fn) => fn(prevResult), initialValue)
}

/**
 * Transformers process the content to prepare it for usage in the apps and websites.
 * Each transformer function should have a distinct purpose, and a clear name.
 *
 * They all follow the type signature (content: T) => T, meaning they process content and returns it in the same format.
 *
 * Some transformers may need additional arguments, for example other parts of preprocessed content.
 * These transformers then return the actual transformer function.
 *
 * Arguments are provided via a process called currying (https://en.wikipedia.org/wiki/Currying)
 */
export const TRANSFORMERS = {
    keepPublishedStories(stories: Story[]) {
        return stories.filter((story) => story.publishedAt)
    },
    keepRelevantTags(entities: Story[] | Tool[]) {
        return (tags: Tag[]) =>
            tags.filter((tag) => entities.some((entity) => entity.tags.includes(tag.id)))
    },
    useConsistentStoryImageURLs(stories: Story[]) {
        return stories.map((story) => {
            story.image = getConsistentAssetURL(story.image, '/community/static')
            story.story = story.story.replace(/\/community\/static\/images/g, '/images')
            return story
        })
    },
    sortTagsAlphabetically(tags: Tag[]) {
        return getTagsSortedAlphabetically(tags)
    },
    sortEntityTagsAlphabetically(tags: Tag[]) {
        return <T>(entities: Story[] | Tool[]) =>
            entities.map((entity) => {
                // IDEA: Or should tags be sorted by number of stories/tools using them?
                // This would make the popular tags appear first and might give a better UX

                entity.tags = getTagsSortedAlphabetically(
                    entity.tags.map((tag) => getTag(tag, { tags })),
                ).map((tag) => tag.id)

                return entity as T
            })
    },
    /**
     * This processing enables one of the key features: backwards compatible links thanks to the slug staying the same
     * This also enables built-in short links.
     */
    updateLink<T>(entities: Story[] | Tool[]) {
        return entities.map((entity) => {
            const name = (entity as Story).title ?? (entity as Tool).name
            if (!name) {
                throw new Error(
                    `content with id "${entity.id}" has no title or name, needed for creating the link. Seems like some localised version of the content might be broken.`,
                )
            }
            const newLink = createBackwardsCompatibleLink(name, entity.slug)
            if (newLink !== entity.link) {
                if (entity.link !== undefined) {
                    console.warn(
                        `[content] Link has changed for "${name}" from old: "${entity.link}" to new: "${newLink}"`,
                    )
                }
                entity.link = newLink
            }
            return entity
        }) as T
    },
    sortStories(featured: FeaturedContent) {
        return (stories: Story[]) => getSortedStories(stories, featured)
    },
    sortTools(skills: Skill[]) {
        const skillIds = skills.map((skill) => skill.id)
        return (tools: Tool[]) => tools.slice().sort(mostRelevantToolsFirst(skillIds))
    },
    filterAndSortRelevancyScores(locale: Locale) {
        return (tools: Tool[]) =>
            tools.map((tool) => {
                const sortedRelevancyScores = tool.relevancy
                    .filter((t) => t.score > 30) // Filter out irrelevant skills
                    .sort((a, b) => b.score - a.score) // Most relevant first

                if (sortedRelevancyScores.length < tool.relevancy.length) {
                    console.warn(
                        `[content] Removed ${
                            tool.relevancy.length - sortedRelevancyScores.length
                        } relevancy scores with <= 30 relevancy from tool "${
                            tool.name
                        }" for locale "${locale}"`,
                    )
                }

                tool.relevancy = sortedRelevancyScores
                return tool
            })
    },
}
