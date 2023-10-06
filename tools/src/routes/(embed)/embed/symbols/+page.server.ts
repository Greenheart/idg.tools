import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

import { content } from '$lib/content-backend'

export const prerender = true

export const load = (async () => {
    if (content) {
        const { skills } = content
        return { skills }
    }

    throw error(500)
}) satisfies PageServerLoad
