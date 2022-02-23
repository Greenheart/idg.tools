import { compile } from 'mdsvex'
import sanitizeHTML, { IOptions } from 'sanitize-html'

import _content from '../../static/content.json'
import type { Content } from '$lib/types'

// NOTE: This is only available in SvelteKit endpoints since `content.json` is a file
export const content = _content as unknown as Content

const cleanHTML = (dangerousHTML: string) => {
    // NOTE: This config needs to be updated based on what type of markdown content we expect from the CMS
    const SANITIZE_HTML_CONFIG: IOptions = {
        allowedTags: [
            'blockquote',
            'li',
            'ol',
            'p',
            'ul',
            'a',
            'br',
            'em',
            'span',
            'strong',
        ],
        disallowedTagsMode: 'discard',
        allowedAttributes: {
            a: ['href', 'name', 'target'],
        },
        selfClosing: [],
        allowedSchemes: ['http', 'https'],
        allowedSchemesByTag: {},
        allowedSchemesAppliedToAttributes: ['href', 'src'],
        allowProtocolRelative: false,
        enforceHtmlBoundary: false,
    }

    return sanitizeHTML(dangerousHTML, SANITIZE_HTML_CONFIG)
}

// TODO: Add support for layout with custom components if possible
export const renderMarkdown = async (rawMarkdown: string) => {
    const dangerousHTML = (await compile(rawMarkdown))?.code ?? ''
    return cleanHTML(dangerousHTML)
}
