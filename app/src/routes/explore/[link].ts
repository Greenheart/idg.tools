import type { RequestHandlerOutput } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getToolByLink } from '$lib/content-utils'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({
    params: { link },
}: {
    params: Record<string, string>
}) {
    const tool = getToolByLink(link, content)

    if (tool) {
        return {
            body: { tool, content },
            // If page was found on a different URL,
            // permanently redirect to the updated url (HTTP 301)
            // to prevent multiple URLs publishing the same content.
            status: link === tool.link ? 200 : 301,
            headers: {
                location: `/explore/${tool.link}`,
            },
        } as RequestHandlerOutput
    }

    return { status: 404 }
}
