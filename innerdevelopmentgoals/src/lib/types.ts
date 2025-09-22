import type { locales } from './content'

type ItemId = string

type Item = {
    id: ItemId
    name: string
    description: string
}

export type Skill = Item & {
    dimension: ItemId
}

export type Dimension = Item & {
    subtitle: string
    skills: Skill['id'][]
}

export type IDGSymbols = Record<Skill['id'] | Dimension['id'], string[]>

export type Locale = keyof typeof locales
export type SupportedLocales = Record<Locale, string>

export type WidgetContent = {
    dimensions: Dimension[]
    skills: Skill[]
}

export type DimensionSlug = 'being' | 'thinking' | 'relating' | 'collaborating' | 'acting'

// Props are declared here instead of in the component to workaround the lack of proper .d.ts generation
export type IDGFrameworkProps = {
    /** The default locale to show until the user selects another locale. */
    defaultLocale?: keyof typeof locales
    /** Remember the user's preferred locale using localStorage */
    persistLocale?: boolean
}
