import { error } from '@sveltejs/kit'
import { getContent, getSupportedLocales } from '$lib/content-backend'
import type { EntryGenerator, PageServerLoad } from './$types'

const supportedLocales = getSupportedLocales()

export const entries = (() =>
    Object.keys(supportedLocales).map((locale) => ({ locale }))) satisfies EntryGenerator

export const prerender = 'auto'

export const load = (async ({ params }) => {
    // TODO: Get the user's preferred content locale via the `Accept-Language` HTTP header
    // TODO: If the current locale is not found, redirect to a locale that does exist.
    // Make sure to make the proper redirect to prevent dead/duplicate content links
    // Build this into getLocale() so it happens automatically
    const content = getContent(params.locale)

    if (content && supportedLocales) {
        const { skills, dimensions } = content
        return { skills, dimensions, supportedLocales }
    }

    throw error(500)
}) satisfies PageServerLoad
