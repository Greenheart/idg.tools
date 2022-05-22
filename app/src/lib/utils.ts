import sanitize from 'sanitize-html'
import type { IOptions } from 'sanitize-html'

export const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min

export const cx = (...classes: (string | undefined)[]) =>
    classes.filter(Boolean).join(' ').trim()

/**
 * Test if an URL is external.
 * @param href The URL to test.
 * @returns True if the link is external, and false otherwise.
 */
export function isExternalURL(href: string): boolean {
    const a = document.createElement('a')
    a.href = href
    return window.location.host !== a.host
}

export const sanitizeHTML = (dangerousHTML: string) => {
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

    return sanitize(dangerousHTML, SANITIZE_HTML_CONFIG)
}
