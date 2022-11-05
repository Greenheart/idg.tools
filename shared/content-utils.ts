import type { Dimension, ToolsContent, Skill, Tag, Tool } from './types'

export const getDimension = (
    id: Dimension['id'],
    { dimensions }: Pick<ToolsContent, 'dimensions'>,
) => dimensions.find((c) => c.id === id) as Dimension

export const getSkill = (
    id: Skill['id'],
    { skills }: Pick<ToolsContent, 'skills'>,
) => skills.find((s) => s.id === id) as Skill

export const getTag = (id: Tag['id'], { tags }: Pick<ToolsContent, 'tags'>) =>
    tags.find((t) => t.id === id) as Tag

/**
 * By supporting backwards compatible links that end with a `cuid.slug()`,
 * we make it possible to find the same tool in multiple ways:
 * 1) /finding-your-inner-compass-105l07u
 * 2) /invalid-or-old-name-still-works-105l07u
 * 3) /105l07u
 *
 * With the third case, we get built-in support for short URLs. Not that easy to type, but at least they are few characters.
 */
export const getToolByLink = (
    link: Tool['link'],
    { tools }: Pick<ToolsContent, 'tools'>,
) => tools.find((t) => t.link === link || link.endsWith(t.slug)) as Tool

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

export const mostRelevantContentFirst =
    (selectedSkills: Skill['id'][]) => (a: Tool, b: Tool) =>
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
                ? selectedTags.some((tagId) =>
                      tool.tags.some((id) => id === tagId),
                  )
                : true

            return hasMatchingSkills && hasMatchingTags
        })
        .sort(mostRelevantContentFirst(selectedSkills))
