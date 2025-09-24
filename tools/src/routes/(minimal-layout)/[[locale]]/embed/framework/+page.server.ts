import IDGFramework from 'innerdevelopmentgoals/framework'

export const entries = () => IDGFramework.locales.map((locale) => ({ locale }))

export const prerender = true
