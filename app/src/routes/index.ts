import { content } from '$lib/content-backend'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {
    if (content) {
        return { body: { content } }
    }

    return { status: 500 }
}
