import { COLORS } from './constants'
import type { Dimension, Skill } from './types'

export const cx = (...classes: (string | undefined | false)[]) =>
    classes.filter(Boolean).join(' ').trim()

/**
 * Truncate a text to a max length, keeping whole words.
 */
export function truncateText(text: string, maxLength: number, separator = ' ') {
    const compact = text.replace(/\n/g, ' ')
    if (compact.length <= maxLength) return compact
    const res = compact.slice(0, text.lastIndexOf(separator, maxLength)).replace(/,$/, '')
    return res.endsWith('.') ? res : res + '…'
}

export const getColor = (id: Dimension['id'] | Skill['id'], colorType: 'bg' | 'text' = 'bg') =>
    `${colorType}-${COLORS[id]}`

// TODO: This needs to be updated to support other languages than English, but is good enough for now.
export const pluralize = (item: string, count: number, showCount = true) => {
    const formattedItems = count === 1 ? item : `${item}s`
    return showCount ? `${count} ${formattedItems}` : formattedItems
}

export const shouldTriggerKeyboardInteraction = (event: KeyboardEvent) =>
    event.code === 'Return' || event.key === 'Space'

export const onKeydown = (action: () => void) => (event: KeyboardEvent) => {
    if (shouldTriggerKeyboardInteraction(event)) {
        action()
    }
}

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
