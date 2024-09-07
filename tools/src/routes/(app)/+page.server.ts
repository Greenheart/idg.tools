import { error } from '@sveltejs/kit'
import { content } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

export const load = (async () => {
    if (content) {
        return { content }
    }

    error(500);
}) satisfies PageServerLoad
