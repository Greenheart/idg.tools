import _content from '../../static/content.json'
import type { Locale, ToolsContent } from '$shared/types'
import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'

// NOTE: This is only available in SvelteKit endpoints since `content.json` is a file
// NOTE: Hardcoding English locale content for now, but we can add support for more translations in the future.
export const content = _content[DEFAULT_LOCALE_IDENTIFIER] as unknown as ToolsContent

/**
 * Gets the content bundle for a specific locale.
 */
export const getContent = (locale: Locale = DEFAULT_LOCALE_IDENTIFIER) =>
    _content[locale] as unknown as ToolsContent
