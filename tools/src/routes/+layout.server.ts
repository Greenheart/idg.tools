import { error } from '@sveltejs/kit'
import { getSupportedLocales } from '$lib/content-backend'
import type { LayoutServerLoad } from './$types'

export const prerender = true

export const load = (async () => {
    const supportedLocales = getSupportedLocales()

    if (supportedLocales) {
        return { supportedLocales }
    }

    throw error(500)
}) satisfies LayoutServerLoad
