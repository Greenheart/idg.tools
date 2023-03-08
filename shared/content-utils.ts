import { DEFAULT_LOCALE_IDENTIFIER, LOCALE_IDENTIFIERS } from './constants'
import type {
    Dimension,
    ToolsContent,
    Skill,
    Tag,
    Tool,
    CommunityContent,
    Story,
    Contributor,
    FeaturedContent,
    AllContent,
    Locale,
} from './types'

export const getLocale = (locale?: string) =>
    LOCALE_IDENTIFIERS.includes(locale as Locale) ? (locale as Locale) : DEFAULT_LOCALE_IDENTIFIER

export const getDimension = (id: Dimension['id'], { dimensions }: Pick<AllContent, 'dimensions'>) =>
    dimensions.find((c) => c.id === id) as Dimension

export const getSkill = (id: Skill['id'], { skills }: Pick<AllContent, 'skills'>) =>
    skills.find((s) => s.id === id) as Skill

export const getTag = (id: Tag['id'], { tags }: Pick<AllContent, 'tags'>) =>
    tags.find((t) => t.id === id) as Tag

export const getContributor = (
    id: Contributor['id'],
    { contributors }: Pick<CommunityContent, 'contributors'>,
) => contributors.find((c) => c.id === id) as Contributor

/**
 * By supporting backwards compatible links that end with a `cuid.slug()`,
 * we make it possible to find the same tool in multiple ways:
 * 1) /finding-your-inner-compass-105l07u
 * 2) /invalid-or-old-name-still-works-105l07u
 * 3) /105l07u
 *
 * With the third case, we get built-in support for short URLs. Not that easy to type, but at least they are few characters.
 */
export const getToolByLink = (link: Tool['link'], { tools }: Pick<AllContent, 'tools'>) =>
    tools.find((t) => t.link === link || link.endsWith(t.slug)) as Tool

/**
 * By supporting backwards compatible links that end with a `cuid.slug()`,
 * we make it possible to find the same story in multiple ways:
 * 1) /finding-your-inner-compass-105l07u
 * 2) /invalid-or-old-name-still-works-105l07u
 * 3) /105l07u
 *
 * With the third case, we get built-in support for short URLs. Not that easy to type, but at least they are few characters.
 */
export const getStoryByLink = (
    link: Story['link'],
    { stories }: Pick<CommunityContent, 'stories'>,
) => stories.find((t) => t.link === link || link.endsWith(t.slug)) as Story

/**
 * Given a specific story, get the next story before and after.
 * NOTE: This assumes the stories passed in are sorted by publishing date.
 */
export const getAdjacentStories = (
    id: Story['id'],
    { stories }: Pick<CommunityContent, 'stories'>,
) => {
    const index = stories.sort(sortByPublishingDate).findIndex((story) => story.id === id)
    return { prev: stories[index - 1], next: stories[index + 1] }
}

export const getSkillsInDimension = (id: Dimension['id'], { skills }: Pick<AllContent, 'skills'>) =>
    skills.filter((s) => s.dimension === id)

export const getTotalRelevancyScore = (
    relevancy: Tool['relevancy'],
    selectedSkills: Skill['id'][],
) =>
    relevancy.reduce((totalRelevancy, r) => {
        if (selectedSkills.includes(r.skill)) {
            totalRelevancy += r.score
        }
        return totalRelevancy
    }, 0)

export const mostRelevantToolsFirst = (selectedSkills: Skill['id'][]) => (a: Tool, b: Tool) =>
    getTotalRelevancyScore(b.relevancy, selectedSkills) -
    getTotalRelevancyScore(a.relevancy, selectedSkills)

export const getMostRelevantTools = (
    content: ToolsContent,
    selectedSkills: Skill['id'][],
    selectedTags: Tag['id'][],
) =>
    content.tools
        .filter((tool) => {
            const hasMatchingSkills = selectedSkills.length
                ? selectedSkills.some((skillId) =>
                      tool.relevancy.some(({ skill }) => skill === skillId),
                  )
                : true

            const hasMatchingTags = selectedTags.length
                ? selectedTags.some((tagId) => tool.tags.some((id) => id === tagId))
                : true

            return hasMatchingSkills && hasMatchingTags
        })
        .sort(mostRelevantToolsFirst(selectedSkills))

export const getMostRelevantStories = (
    content: CommunityContent,
    selectedTags: Tag['id'][],
    selectedDimensions: Dimension['id'][],
) =>
    content.stories.filter((story) => {
        const hasMatchingTags = selectedTags.length
            ? selectedTags.some((tagId) => story.tags.some((id) => id === tagId))
            : true
        const hasMatchingDimensions = selectedDimensions.length
            ? selectedDimensions.some((dimensionId) =>
                  story.dimensions.some((id) => id === dimensionId),
              )
            : true
        return hasMatchingTags && hasMatchingDimensions
    })

export const sortByPublishingDate = (a: Story, b: Story) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

export const getSortedStories = (unsortedStories: Story[], featured: FeaturedContent) => {
    const featuredStories = featured.stories.map((storyId) =>
        unsortedStories.find((s) => s.id === storyId),
    ) as Story[]
    const sortedStories = unsortedStories
        .filter((s) => !featured.stories.includes(s.id))
        .sort(sortByPublishingDate)

    return featuredStories.concat(sortedStories)
}

export const getDateString = (date: string) =>
    new Intl.DateTimeFormat('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(date))

export const getDateTimeString = (date: string) =>
    new Intl.DateTimeFormat('sv-SE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short',
    }).format(new Date(date))
