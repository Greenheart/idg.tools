import { error, redirect } from '@sveltejs/kit'
import { getContent, getSupportedLocales } from '$lib/content-backend'
import type { EntryGenerator, PageServerLoad } from './$types'
import { getRawLocale, getRedirectURL } from '$shared/utils'
import { ONE_YEAR_SECONDS } from '$shared/constants'

const supportedLocales = getSupportedLocales()

export const entries = (() =>
    Object.keys(supportedLocales).map((locale) => ({ locale }))) satisfies EntryGenerator

export const prerender = 'auto'

export const load = (async ({ params, url, setHeaders }) => {
    const rawLocale = getRawLocale(url.pathname)
    const redirectURL = getRedirectURL(url.pathname, rawLocale)

    if (url.pathname !== redirectURL) {
        redirect(302, redirectURL)
    }

    // IDEA: Get the user's preferred content locale via the `Accept-Language` HTTP header
    const content = getContent(params.locale)

    if (content && supportedLocales) {
        setHeaders({
            'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}`,
        })

        const { skills, dimensions } = content
        return { skills, dimensions, supportedLocales }
    }

    error(500)
}) satisfies PageServerLoad
