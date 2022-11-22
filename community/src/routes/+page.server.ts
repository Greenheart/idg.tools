import { error } from '@sveltejs/kit'
import { content } from '$lib/content-backend'
import type { PageServerLoad } from './$types'
import { getSortedStories } from '$shared/content-utils'

/** @type {PageServerLoad} */
export async function load() {
    if (content) {
        return {
            content: {
                ...content,
                stories: getSortedStories(content.stories, content.featured),
            },
        }
    }

    throw error(500)
}
