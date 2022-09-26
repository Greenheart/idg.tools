import { redirect } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getSkill, getTag, getToolByLink } from '$shared/content-utils'
import type { Actions, PageServerLoad } from './$types'
import { createIssue, getLatestIssues } from '$lib/github'

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
        console.log('feedback submitted!')

        const raw = await request.formData()

        const data = {
            liked: raw.get('liked'),
            improve: raw.get('improve'),
        }

        // TODO: IMPORTANT to escape Markdown content here
        // IDEA: only allow plain text

        const res = await createIssue({
            userContent: `## What do you like?\n${data.liked}\n\n## What can be improved?\n${data.improve}`,
            type: 'FEEDBACK',
        })
        console.log('returned', res)

        return { success: true }
    },
}
