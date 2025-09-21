import { building, dev } from '$app/environment'
import { getHTMLDirection, getLocale } from '$shared/content-utils'

import { readFile } from 'fs/promises'
import { resolve as resolvePath } from 'path'

const isFrameworkEmbed = /\/embed\/framework/

export const handle = async ({ event, resolve }) => {
    if ((dev || building) && isFrameworkEmbed.test(event.url.pathname)) {
        const embedHTML = await readFile(
            resolvePath('static/assets/widgets/framework.html'),
            'utf-8',
        )
        const locale = getLocale(event.params.locale)

        return new Response(embedHTML.replaceAll('%LOCALE%', locale), {
            headers: { 'Content-Type': 'text/html' },
        })
    }

    return resolve(event, {
        transformPageChunk: ({ html, done }) => {
            if (done) {
                const locale = getLocale(event.params.locale)
                const updated: string = html.replace(
                    '<html lang="en"',
                    `<html lang="${locale}" dir="${getHTMLDirection(locale)}"`,
                )
                return updated
            }
            return html
        },
    })
}
