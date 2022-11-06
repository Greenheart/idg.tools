import { content } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

/** @type {PageServerLoad} */
export async function load() {
    const { stories, dimensions, contributors } = content
    return { stories, dimensions, contributors }
}
