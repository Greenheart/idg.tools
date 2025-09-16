import type { allLocales } from './content'

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

export type Locale = keyof typeof allLocales
export type SupportedLocales = Record<Locale, string>

export type WidgetContent = {
    dimensions: Dimension[]
    skills: Skill[]
}

export type DimensionSlug = 'being' | 'thinking' | 'relating' | 'collaborating' | 'acting'
