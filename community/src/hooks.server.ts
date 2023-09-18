import type { Handle } from '@sveltejs/kit'
import { getHTMLDirection, getLocale } from '$shared/content-utils'

export const handle = (async ({ event, resolve }) => {
    return resolve(event, {
        transformPageChunk: ({ html, done }) => {
            const locale = getLocale(event.params.locale)
            if (done) {
                const updated = html.replace(
                    '<html lang="en"',
                    `<html lang="${locale}" dir="${getHTMLDirection(locale)}"`,
                )
                return updated
            }
            return html
        },
    })
}) satisfies Handle
