import { redirect } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getSkill, getTag, getToolByLink } from '$shared/content-utils'
import type { Actions, PageServerLoad } from './$types'

/** @type {PageServerLoad} */
export async function load({
    params: { link },
}: {
    params: Record<string, string>
}) {
    const tool = getToolByLink(link, content)

    if (tool) {
        const tags = tool.tags.map((tagId) => getTag(tagId, content))
        const skills = tool.relevancy.map((r) => getSkill(r.skill, content))
        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        if (link !== tool.link) {
            const location = `/${tool.link}`
            throw redirect(301, location)
        }

        return { tool, tags, skills }
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const raw = await request.formData()

        const data = {
            liked: raw.get('liked'),
            improve: raw.get('improve'),
        }

        // TODO: Save feedback to somewhere
        console.log('feedback received', data)

        return { success: true }
    },
}
