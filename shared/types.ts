import { LANGUAGES } from './constants'

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

export type OLD_TranslatedContent = {
    categories: Translated<Category>[]
    tools: Translated<Tool>[]
    skills: Translated<Skill>[]
    tags: Translated<Tag>[]
}

export type IDGRelevancy = {
    skill: ItemId
    score: number
}

export type Tag = { id: ItemId; name: string }

export type Language = keyof typeof LANGUAGES

export type Translated<T> = Record<Language, T>
export type TranslatedTool = Translated<Tool>
export type TranslatedTag = Translated<Tag>
export type TranslatedSkill = Translated<Skill>
export type TranslatedCategory = Translated<Category>
export type NewTranslatedContent = Translated<Content>
