import { content } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

/** @type {PageServerLoad} */
export async function load() {
    const { events, dimensions } = content
    return { events, dimensions }
}
