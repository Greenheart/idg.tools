import _content from '../../static/content.json'
import type { ToolsContent } from '$shared/types'
import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'
import { getLocale } from '$shared/content-utils'

// NOTE: This is only available in SvelteKit endpoints since `content.json` is a file
export const content = _content[DEFAULT_LOCALE_IDENTIFIER] as unknown as ToolsContent

/**
 * Gets the content bundle for a specific locale.
 */
export const getContent = (locale?: string) =>
    _content[getLocale(locale)] as unknown as ToolsContent
