import { error } from '@sveltejs/kit'
import { content } from '$lib/content-backend'
import { getSortedStories } from '$shared/content-utils'
import { ONE_YEAR_SECONDS } from '$shared/constants'

export const load = async ({ setHeaders }) => {
    if (content) {
        setHeaders({
            'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}`,
        })
        return {
            content: {
                ...content,
                stories: getSortedStories(content.stories, content.featured),
            },
        }
    }

    error(500)
}
