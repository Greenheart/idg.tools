import { content, renderMarkdown } from '$lib/content-backend'
import { getToolBySlug } from '$lib/content-utils'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params: { slug } }: { params: { slug: string } }) {
    const tool = getToolBySlug(slug, content)

    const description = await renderMarkdown(tool.description)
    const challenge = await renderMarkdown(tool.challenge)
    const resources = await renderMarkdown(tool.resources)

    if (tool) {
        return {
            body: {
                tool: {
                    ...tool,
                    description,
                    challenge,
                    resources,
                },
            },
        }
    }

    return {
        status: 404,
    }
}
