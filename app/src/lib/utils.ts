import { SKILLS_BY_DIMENSION } from '$shared/constants'
import type { Content, ItemId, Skill, Tag, Tool } from '$shared/types'

export const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const cx = (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(' ').trim()

/**
 * Test if an URL is external.
 * @param href The URL to test.
 * @returns True if the link is external, and false otherwise.
 */
export function isExternalURL(href: string): boolean {
    const a = document.createElement('a')
    a.href = href
    return location.host !== a.host
}

export const getBgOpacity = (routeId: string) => {
    if (routeId === '[link]') return 75
    return 55
}

/**
 * Truncate a text to a max length, keeping whole words.
 */
export function truncateText(text: string, maxLength: number, separator = ' ') {
    const compact = text.replace(/\n/g, ' ')
    if (compact.length <= maxLength) return compact
    const res = compact.slice(0, text.lastIndexOf(separator, maxLength))
    return res.endsWith('.') ? res : res + '…'
}

export function getColor(id: ItemId, colorType: 'bg' | 'text' = 'bg') {
    const dimension =
        SKILLS_BY_DIMENSION[
            id as unknown as keyof typeof SKILLS_BY_DIMENSION
        ] ??
        Object.values(SKILLS_BY_DIMENSION).find((dimension) =>
            dimension.skills.some((skillId) => skillId === id),
        )
    return `${colorType}-${dimension.name}`
}

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
    content: Content,
    selectedSkills: Skill['id'][],
    selectedTags: Tag['id'][],
) =>
    content.tools
        .filter(
            (tool) =>
                selectedSkills.every((skillId) =>
                    tool.relevancy.some(({ skill }) => skill === skillId),
                ) &&
                selectedTags.every((tagId) =>
                    tool.tags.some((id) => id === tagId),
                ),
        )
        .sort(mostRelevantContentFirst(selectedSkills))

// TODO: This needs to be updated to support other languages than English, but is good enough for now.
export const pluralize = (item: string, count: number) =>
    count === 1 ? `1 ${item}` : `${count} ${item}s`
