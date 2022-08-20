import _content from '../../static/content.json'
import type { Content } from '$shared/runtime-types'
import { DEFAULT_LANGUAGE_TAG } from '$shared/constants'

// NOTE: This is only available in SvelteKit endpoints since `content.json` is a file
// NOTE: Hardcoding English language content for now, but we can add support for more translations in the future.
export const content = _content[DEFAULT_LANGUAGE_TAG] as unknown as Content
