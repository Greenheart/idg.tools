export type ItemId = string
type Item = {
    id: ItemId
    name: string
    description: string
}
export type Skill = Item & {
    category: ItemId
    tools: ItemId[]
}
export type Category = Item & {
    color: string
    skills: ItemId[]
}
export type Tool = Item & {
    link: string
    description: string
    challenge: string
    resources: string
    categories: ItemId[]
    skills: ItemId[]
}
export type Content = {
    categories: Category[]
    tools: Tool[]
    skills: Skill[]
}
