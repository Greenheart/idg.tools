import _content from '../../static/content.json'
import type { Content } from '$shared/types'

// NOTE: This is only available in SvelteKit endpoints since `content.json` is a file
export const content = _content as unknown as Content
