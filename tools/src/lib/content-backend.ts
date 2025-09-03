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

const getSupportedLocales = () => {
    const supported = Object.keys(_content) as Locale[]

    return supported.reduce<Partial<typeof LOCALES>>((supportedLocales, locale) => {
        supportedLocales[locale] = LOCALES[locale]
        return supportedLocales
    }, {})
}

// Cache result since it won't change unless `_content` changes
export const supportedLocales = getSupportedLocales()
