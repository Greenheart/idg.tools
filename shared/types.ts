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
    id: string
    name: string
    link: string
}

export type Story = {
    id: string
    title: string
    intro: string
    story: string
    dimensions: Dimension['id'][]
    link: string
    slug: string
    contributors: Contributor['id'][]
    publishedAt: string
}

export type Event = Item & {
    startDate: string
    endDate: string
    location: string
    description: string
    dimensions: Dimension['id'][]
    link: string
    slug: string
}

export type ToolsContent = {
    dimensions: Dimension[]
    tools: Tool[]
    skills: Skill[]
    tags: Tag[]
}

export type CommunityContent = {
    stories: Story[]
    events: Event[]
    contributors: Contributor[]
    dimensions: Dimension[]
}

export type AllContent = ToolsContent & CommunityContent

export type IDGRelevancy = {
    skill: ItemId
    score: number
}

export type Tag = { id: ItemId; name: string }

export type Language = keyof typeof LANGUAGES

export type Translated<T> = Partial<Record<Language, T>>
