import { content } from '$lib/content-backend'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
    if (content) {
        return { body: { content } }
    }

    return { status: 500 }
}
