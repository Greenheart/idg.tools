import { error } from '@sveltejs/kit'
import { content } from '$lib/content-backend'
import { ONE_YEAR_SECONDS } from '$shared/constants'

export const load = async ({ setHeaders }) => {
    if (content) {
        setHeaders({
            'Cache-Control': `public, max-age=${ONE_YEAR_SECONDS}`,
        })
        return { content }
    }

    error(500)
}
