export type ItemId = string
type Item = {
    id: ItemId
    name: string
    description: string
}
type DocumentData = unknown
export type Skill = Item & {
    category: ItemId
    tools: ItemId[]
}
export type Category = Item & {
    color: string
    skills: ItemId[]
}
export type Tool = Item & {
    slug: string
    description: DocumentData
    challenge: DocumentData
    resource: DocumentData
    categories: ItemId[]
    skills: ItemId[]
}
export type Content = {
    categories: Category[]
    tools: Tool[]
    skills: Skill[]
}
