import { redirect } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

/** @type {PageServerLoad} */
export async function load() {
    throw redirect(301, '/')
}
