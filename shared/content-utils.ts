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
} from './types'

export const getDimension = (
    id: Dimension['id'],
    { dimensions }: Pick<ToolsContent, 'dimensions'>,
) => dimensions.find((c) => c.id === id) as Dimension

export const getSkill = (id: Skill['id'], { skills }: Pick<ToolsContent, 'skills'>) =>
    skills.find((s) => s.id === id) as Skill

export const getTag = (id: Tag['id'], { tags }: Pick<ToolsContent, 'tags'>) =>
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
export const getToolByLink = (link: Tool['link'], { tools }: Pick<ToolsContent, 'tools'>) =>
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

export const getSkillsInDimension = (
    id: Dimension['id'],
    { skills }: Pick<ToolsContent, 'skills'>,
) => skills.filter((s) => s.dimension === id)

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

export const mostRelevantContentFirst = (selectedSkills: Skill['id'][]) => (a: Tool, b: Tool) =>
    getTotalRelevancyScore(b.relevancy, selectedSkills) -
    getTotalRelevancyScore(a.relevancy, selectedSkills)

export const getMostRelevantContent = (
    content: ToolsContent,
    selectedSkills: Skill['id'][],
    selectedTags: Tag['id'][],
) =>
    content.tools
        .filter((tool) => {
            const hasMatchingSkills = selectedSkills.every((skillId) =>
                tool.relevancy.some(({ skill }) => skill === skillId),
            )
            const hasMatchingTags = selectedTags.length
                ? selectedTags.some((tagId) => tool.tags.some((id) => id === tagId))
                : true

            return hasMatchingSkills && hasMatchingTags
        })
        .sort(mostRelevantContentFirst(selectedSkills))

export const sortByPublishingDate = (a: Story, b: Story) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

export const showFeaturedFirstAndThenByPublishingDate =
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
