import { redirect, error } from '@sveltejs/kit'
import { remark } from 'remark'
import stripMarkdown from 'strip-markdown'

import { content } from '$lib/content-backend'
import { getSkill, getTag, getToolByLink } from '$shared/content-utils'
import type { Actions, PageServerLoad } from './$types'
import { createIssue } from '$lib/github'

// Disable prerendering only for this page, since we want the server-side redirect, and also to support the feedback form
export const prerender = false

const sanitizer = remark().use(stripMarkdown)

const sanitizeInput = (raw: string) => sanitizer.process(raw).then((value) => value.toString())

export const load = (async ({ params: { link } }: { params: Record<string, string> }) => {
    const tool = getToolByLink(link, content)

    if (tool) {
        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        // TODO: Make sure redirects target a valid locale.
        // First try with the current locale but then with the default fallback one.
        // Also beware that content may exist in one locale but not in others.
        // TODO: Also redirect from `/${DEFAULT_LOCALE_IDENTIFIER}/path` to `/path`
        // This is necessary to prevent duplicate content across multiple URLs.
        if (link !== tool.link) throw redirect(301, `/${tool.link}`)

        const tags = tool.tags.map((tagId) => getTag(tagId, content))
        const skills = tool.relevancy.map((r) => getSkill(r.skill, content))

        return { tool, tags, skills }
    }

    throw error(404, `No tool found with the link: "${link}"`)
}) satisfies PageServerLoad

export const actions: Actions = {
    default: async ({ request, url }) => {
        const raw = await request.formData()

        if (raw.get('description')) return { success: true }

        const data = {
            liked: raw.get('liked'),
            improve: raw.get('improve'),
        } as Record<'liked' | 'improve', string | null>

        if (data.liked) {
            data.liked = await sanitizeInput(data.liked)
        }
        if (data.improve) {
            data.improve = await sanitizeInput(data.improve)
        }

        if (!Boolean(data.liked || data.improve)) return { success: false }

        await createIssue({
            userContent: `## What do you like?\n> ${data.liked}\n\n## What can be improved?\n> ${data.improve}`,
            type: 'FEEDBACK',
            url: url.href,
        })

        return { success: true }
    },
}
