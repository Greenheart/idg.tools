import { getHTMLDirection, getLocale } from '$shared/content-utils'

export const handle = async ({ event, resolve }) => {
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
