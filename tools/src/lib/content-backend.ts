import _content from '../../static/content.json'
import type { Locale, ToolsContent } from '$shared/types'
import { DEFAULT_LOCALE_IDENTIFIER, LOCALES } from '$shared/constants'
import { getLocale } from '$shared/content-utils'

// NOTE: This is only available in SvelteKit endpoints since `content.json` is a file
export const content = _content[DEFAULT_LOCALE_IDENTIFIER] as unknown as ToolsContent

/**
 * Gets the content bundle for a specific locale.
 */
export const getContent = (locale?: string) =>
    _content[getLocale(locale) as unknown as keyof typeof _content] as unknown as ToolsContent

/**
 * Get the supportedLocales, sorted based on the order of the keys of `LOCALES`.
 * This preserves the desired sorting.
 */
const getSupportedLocales = () => {
    const all = Object.entries(LOCALES) as [Locale, string][]
    const supported = Object.keys(_content) as Locale[]

    // Use a Map to preserve the insert order of keys during JSON (de)serialization.
    return all.reduce<Map<Locale, string>>((supportedLocales, [locale, label]) => {
        if (supported.includes(locale)) {
            supportedLocales.set(locale, label)
        }
        return supportedLocales
    }, new Map())
}

// Cache result since it won't change unless `_content` changes
export const supportedLocales = getSupportedLocales()
