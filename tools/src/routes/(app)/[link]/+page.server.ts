import { redirect, error } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getSkill, getTag, getToolByLink } from '$shared/content-utils'
import type { EntryGenerator, PageServerLoad } from './$types'

export const entries = (() => content.tools.map(({ link }) => ({ link }))) satisfies EntryGenerator

export const prerender = 'auto'

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
