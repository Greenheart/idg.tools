import { supportedLocales } from '$lib/content-backend'

export const entries = () => Object.keys(supportedLocales).map((locale) => ({ locale }))

export const prerender = true
