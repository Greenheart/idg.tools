import { content } from '$lib/content-backend'
import { getToolByLink } from '$lib/content-utils'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { link } }: { params: { link: string } }) {
    const tool = getToolByLink(link, content)

    if (tool) {
        return { body: { tool, content } }
    }

    return {
        status: 404,
    }
}
