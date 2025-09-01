import { redirect, error } from '@sveltejs/kit'

import { content } from '$lib/content-backend'
import {
    getAdjacentStories,
    getContributor,
    getDimension,
    getStoryByLink,
    getTag,
} from '$shared/content-utils'
import { ONE_YEAR_SECONDS } from '$shared/constants'

export const entries = () => content.stories.map(({ link }) => ({ link }))

export const prerender = 'auto'

export const load = async ({ params: { link }, setHeaders }) => {
    const story = getStoryByLink(link, content)
    if (story) {
        setHeaders({
            'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}`,
        })

        // If page was found on a different URL,
        // permanently redirect to the updated url (HTTP 301)
        // to prevent multiple URLs publishing the same content.
        if (link !== story.link) redirect(301, `/stories/${story.link}`)

        const dimensions = story.dimensions.map((id) => getDimension(id, content))
        const { prev, next } = getAdjacentStories(story.id, content)
        const contributors = story.contributors.map((id) => getContributor(id, content))
        const tags = story.tags.map((tagId) => getTag(tagId, content))

        return {
            story,
            dimensions,
            contributors,
            tags,
            prev: prev ? { link: prev.link, title: prev.title } : undefined,
            next: next ? { link: next.link, title: next.title } : undefined,
        }
    }

    error(404, `No story found with the link: "${link}"`)
}
