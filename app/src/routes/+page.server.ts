import { content } from '$lib/content-backend'

/** @type {import('@sveltejs/kit').PageServerLoad} */
export async function load() {
    if (content) {
        return { content }
    }
}
