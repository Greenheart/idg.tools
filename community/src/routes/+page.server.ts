import { error } from '@sveltejs/kit'
import { content } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

/** @type {PageServerLoad} */
export async function load() {
    if (content) {
        return { content }
    }

    throw error(500)
}
