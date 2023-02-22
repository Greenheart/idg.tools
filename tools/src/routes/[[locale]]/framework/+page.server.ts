import { error } from '@sveltejs/kit'
import { getContent } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

export const load = (async ({ params }) => {
    const content = getContent(params.locale)
    if (content) {
        const { skills, dimensions } = content
        return { skills, dimensions }
    }

    throw error(500)
}) satisfies PageServerLoad
