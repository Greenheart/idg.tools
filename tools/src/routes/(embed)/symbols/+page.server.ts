import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { content } from '$lib/content-backend'

export const prerender = 'auto'

export const load = (async () => {
    if (content) {
        const { skills, dimensions } = content
        return { skills, dimensions }
    }

    throw error(500)
}) satisfies PageServerLoad
