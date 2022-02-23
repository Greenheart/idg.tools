import { content } from '$lib/content-backend'
import { getToolBySlug } from '$lib/content-utils'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { slug } }: { params: { slug: string } }) {
    const tool = getToolBySlug(slug, content)

    if (tool) {
        return { body: { tool, content } }
    }

    return {
        status: 404,
    }
}
