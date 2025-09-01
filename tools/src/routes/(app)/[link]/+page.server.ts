import { redirect, error } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import { getSkill, getTag, getToolByLink } from '$shared/content-utils'
import { ONE_YEAR_SECONDS } from '$shared/constants'

export const entries = () => content.tools.map(({ link }) => ({ link }))

export const prerender = 'auto'

export const load = async ({ params: { link }, setHeaders }) => {
    const tool = getToolByLink(link, content)

    if (tool) {
        setHeaders({
            'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}`,
        })
        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        // TODO: Make sure redirects target a valid locale.
        // First try with the current locale but then with the default fallback one.
        // Also beware that content may exist in one locale but not in others.
        // TODO: Also redirect from `/${DEFAULT_LOCALE_IDENTIFIER}/path` to `/path`
        // This is necessary to prevent duplicate content across multiple URLs.
        if (link !== tool.link) redirect(301, `/${tool.link}`)

        const tags = tool.tags.map((tagId) => getTag(tagId, content))
        const skills = tool.relevancy.map((r) => getSkill(r.skill, content))

        return { tool, tags, skills }
    }

    error(404, `No tool found with the link: "${link}"`)
}
