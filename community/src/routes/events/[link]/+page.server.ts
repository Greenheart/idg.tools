import { redirect, error } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getDimension, getEventByLink } from '$shared/content-utils'
import type { PageServerLoad } from './$types'

/** @type {PageServerLoad} */
export async function load({
    params: { link },
}: {
    params: Record<string, string>
}) {
    const event = getEventByLink(link, content)
    const dimensions = event.dimensions.map((id) => getDimension(id, content))

    if (event) {
        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        if (link !== event.link) {
            const location = `/events/${event.link}`
            throw redirect(301, location)
        }

        return { event, dimensions }
    }

    throw error(404, `No event found with the link: "${link}"`)
}
