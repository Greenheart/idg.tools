import { error } from '@sveltejs/kit'
import { content } from '$lib/content-backend'
import type { PageServerLoad } from './$types'
import { getSortedStories } from '$shared/content-utils'

export const load = (async () => {
    if (content) {
        return {
            content: {
                ...content,
                stories: getSortedStories(content.stories, content.featured),
            },
        }
    }

    throw error(500)
}) satisfies PageServerLoad
