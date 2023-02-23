import { error } from '@sveltejs/kit'
import { getSupportedLocales } from '$lib/content-backend'
import type { PageServerLoad } from './$types'

export const prerender = true

// TODO: Figure out why this type doesn't work. Seems to be related to SvelteKit types.
export const load = (async () => {
    const supportedLocales = getSupportedLocales()

    if (supportedLocales) {
        return { supportedLocales }
    }

    throw error(500)
}) satisfies PageServerLoad
