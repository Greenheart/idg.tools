import { SKILLS_BY_DIMENSION } from '$shared/constants'
import type { ItemId } from '$shared/types'

export const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const cx = (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(' ').trim()

/**
 * Test if an URL is external.
 * @param href The URL to test.
 * @returns True if the link is external, and false otherwise.
 */
export function isExternalURL(href: string, staticPath = '/assets/'): boolean {
    const a = document.createElement('a')
    a.href = href
    return location.host !== a.host || href.includes(staticPath)
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
    const res = compact
        .slice(0, text.lastIndexOf(separator, maxLength))
        .replace(/,$/, '')
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

// TODO: This needs to be updated to support other languages than English, but is good enough for now.
export const pluralize = (item: string, count: number) =>
    count === 1 ? `1 ${item}` : `${count} ${item}s`

export const shouldTriggerKeyboardInteraction = (event: KeyboardEvent) =>
    event.code === 'Return' || event.key === 'Space'

export const onKeydown = (action: () => void) => (event: KeyboardEvent) => {
    if (shouldTriggerKeyboardInteraction(event)) {
        action()
    }
}
