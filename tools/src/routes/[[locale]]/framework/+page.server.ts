import { error } from '@sveltejs/kit'
import { getContent } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

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
