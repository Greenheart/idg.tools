import { error } from '@sveltejs/kit'
import { getContent } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

// TODO: Figure out a way to prerender the localized routes.
// We have all content so we should be able to solve this if we either render all available locales and link to the content
// or if we provide the routes that should be prerendered.
export const prerender = false

export const load = (async ({ params }) => {
    // TODO: Get the user's preferred content locale via the `Accept-Language` HTTP header
    // Build this into getLocale() so it happens automatically
    const content = getContent(params.locale)
    if (content) {
        const { skills, dimensions } = content
        return { skills, dimensions }
    }

    throw error(500)
}) satisfies PageServerLoad
