// import type { redirect } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getToolByLink } from '$shared/content-utils'

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load({
    params: { link },
}: {
    params: Record<string, string>
}) {
    const tool = getToolByLink(link, content)

    if (tool) {
        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        // TODO: Re-enable this when https://github.com/sveltejs/kit/issues/5952 has been solved.
        // if (link !== tool.link) {
        //     const location = `/explore/${tool.link}`
        //     throw redirect(301, location)
        // }

        return { tool, content }
    }
}
