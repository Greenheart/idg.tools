import type { LOCALES } from './constants'

export type ItemId = string

type Item = {
    id: ItemId
    name: string
    description: string
}

export type Skill = Item & {
    dimension: ItemId
    questions: string[]
}

export type Dimension = Item & {
    color: string
    subtitle: string
    skills: Skill['id'][]
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
    image: string
    imageAlt: string
    story: string
    dimensions: Dimension['id'][]
    link: string
    slug: string
    contributors: Contributor['id'][]
    publishedAt: string
    tags: Tag['id'][]
}

export type FeaturedContent = {
    stories: Story['id'][]
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
    featured: FeaturedContent
}

export type ToolsCollections = (keyof ToolsContent)[]
export type CommunityCollections = (keyof CommunityContent)[]

export type AllContent = ToolsContent & CommunityContent

export type IDGRelevancy = {
    skill: Skill['id']
    score: number
}

export type IDGColorMap = {
    [id: Dimension['id'] | Skill['id']]:
        | 'being'
        | 'thinking'
        | 'relating'
        | 'collaborating'
        | 'acting'
}

export type Tag = { id: ItemId; name: string }

export type Locale = keyof typeof LOCALES

export type Localised<T> = Partial<Record<Locale, T>>

// TODO: Figure out the best way to type this
// export type SupportedLocales = Partial<Record<Locale, string>>
// export type SupportedLocales = Localised<string>
export type SupportedLocales = Partial<typeof LOCALES>
