import { locales } from 'innerdevelopmentgoals/framework'

export const entries = () => locales.map((locale) => ({ locale }))

export const prerender = true
