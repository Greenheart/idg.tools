import { COLORS, DEFAULT_LOCALE_IDENTIFIER, IDG_COLORS_RGB, LOCALE_IDENTIFIERS } from './constants'
import type { Dimension, Locale, Skill } from './types'

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

export const getColor = (id: Dimension['id'] | Skill['id'], colorType: 'bg' | 'text' = 'bg') => {
    return `${colorType}-${COLORS[id]}`
}

export const getDimensionSlug = (id: Dimension['id'] | Skill['id']) => COLORS[id]

export const getRGBColor = (id: Dimension['id'] | Skill['id']) => IDG_COLORS_RGB[COLORS[id]]

// TODO: This needs to be updated to support other locales than English, but is good enough for now.
export const pluralize = (item: string, count: number, showCount = true) => {
    const formattedItems = count === 1 ? item : `${item}s`
    return showCount ? `${count} ${formattedItems}` : formattedItems
}

// NOTE: Help wanted to improve the type definitions for this function
// Open the files where it's used to see the TS error
export const shouldTriggerKeyboardInteraction = (event: KeyboardEvent) =>
    event.code === 'Return' || event.key === 'Space'

// NOTE: Help wanted to improve the type definitions for this function
// Open the files where it's used to see the TS error
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

export const hasScrollbar = () => window.innerWidth > document.documentElement.clientWidth

export const getScrollbarWidth = () => {
    const a: HTMLDivElement = document.createElement('div')
    const b: HTMLDivElement = document.createElement('div')

    a.style.width = '100px'
    a.style.overflowX = 'scroll'
    b.style.width = '100px'

    document.body.appendChild(a)
    document.body.appendChild(b)

    let scrollbarSize = a.offsetHeight - b.offsetHeight

    document.body.removeChild(a)
    document.body.removeChild(b)

    return scrollbarSize
}

export function getOffset(element: HTMLElement) {
    const rect = element.getBoundingClientRect()
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
    }
}

export const removeLeadingSlash = (string: string) => string.replace(/^\//, '')

export const getCurrentLocale = (path: string) =>
    LOCALE_IDENTIFIERS.find((identifier) => path.startsWith(`/${identifier}/`))

/**
 * Get the localised version of location.pathname for a given locale.
 * Adapts the output based on the currentLocale to keep URLs as simple as possible.
 */
export const getLocalisedPath = (locale: Locale, path: string) => {
    const currentLocale = getCurrentLocale(path)

    if (locale === DEFAULT_LOCALE_IDENTIFIER) {
        // No need to replace if we want the default locale and don't have any current one.
        if (!currentLocale) return path
        // Shorten down default locale to keep URLs simple and consistent.
        return path.replace(`/${currentLocale}/`, '/')
    } else if (currentLocale) {
        // Replace with new locale.
        return path.replace(`/${currentLocale}/`, `/${locale}/`)
    } else {
        return `/${locale}/${removeLeadingSlash(path)}`
    }
}
