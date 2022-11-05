import type { LANGUAGES } from './constants'

export type ItemId = string

type Item = {
    id: ItemId
    name: string
    description: string
}

export type Skill = Item & {
    dimension: ItemId
}

export type Dimension = Item & {
    color: string
    skills: ItemId[]
}

export type Tool = Item & {
    link: string
    intro: string
    slug: string
    actions: string
    resources: string
    relevancy: IDGRelevancy[]
    tags: Tag['id'][]
}

export type Contributor = {
    name: string
    link: string
}

export type Story = {
    title: string
    intro: string
    story: string
    dimensions: Dimension['id'][]
    link: string
    slug: string
    publishedAt: string
    tags: Tag['id'][]
}

export type ToolsContent = {
    dimensions: Dimension[]
    tools: Tool[]
    skills: Skill[]
    tags: Tag[]
}

export type CommunityContent = {
    stories: Story[]
    contributors: Contributor[]
    dimensions: Dimension[]
    tags: Tag[]
}

export type IDGRelevancy = {
    skill: ItemId
    score: number
}

export type Tag = { id: ItemId; name: string }

export type Language = keyof typeof LANGUAGES

export type Translated<T> = Partial<Record<Language, T>>
