import { content } from '$lib/content'
import { getToolBySlug } from '$lib/content-utils'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { slug } }: { params: { slug: string } }) {
    const tool = getToolBySlug(slug, content)

    if (tool) {
        return {
            body: { tool },
        }
    }

    // If no tool was found with a given slug, redirect to /explore
    return {
        status: 404,
    }
}
