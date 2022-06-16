import { LANGUAGES } from './constants'

export type ItemId = string

type Item = {
    id: ItemId
    name: string
    description: string
}

export type Skill = Item & {
    category: ItemId
}

export type Category = Item & {
    color: string
    skills: ItemId[]
}

export type Tool = Item & {
    link: string
    slug: string
    actions: string
    resources: string
    relevancy: IDGRelevancy[]
}

export type Content = {
    categories: Category[]
    tools: Tool[]
    skills: Skill[]
    tags: Tag[]
}

export type IDGRelevancy = {
    skill: ItemId
    score: number
}

export type Tag = { id: ItemId; name: string }

export type Translated<T> = Record<keyof typeof LANGUAGES, T>
export type TranslatedContent = Translated<Content>
export type TranslatedTool = Translated<Tool>
export type TranslatedTag = Translated<Tag>
export type TranslatedSkill = Translated<Skill>
export type TranslatedCategory = Translated<Category>
