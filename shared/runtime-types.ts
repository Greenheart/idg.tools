import type { LANGUAGES } from './constants'

export type ItemId = string

type Item = {
    id: ItemId
    name: string
    description: string
}

export type Skill = Item & {
    category: ItemId
    color: string
}

export type Category = Item & {
    color: string
    skills: string[]
}

export type Tool = Item & {
    link: string
    slug: string
    actions: string
    resources: string
    relevancy: IDGRelevancy[]
    tags: Tag[]
}

export type Content = {
    categories: Category[]
    tools: Tool[]
    skills: Skill[]
    tags: Tag[]
}

export type IDGRelevancy = {
    skill: Skill
    score: number
}

export type Tag = { id: ItemId; name: string }

export type Language = keyof typeof LANGUAGES

export type Translated<T> = Partial<Record<Language, T>>
