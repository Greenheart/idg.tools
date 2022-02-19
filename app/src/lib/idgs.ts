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

export const getCategory = (id: Category['id']): Category =>
    _innerDevelopmentGoals.categories.find((c) => c.id === id) as Category

export const getSkill = (id: Skill['id']): Skill =>
    _innerDevelopmentGoals.skills.find((s) => s.id === id) as Skill

export const getToolBySlug = (slug: Tool['slug']): Tool =>
    _innerDevelopmentGoals.tools.find((t) => t.slug === slug) as Tool

export const getSkillsInCategory = (id: Category['id']): Skill[] =>
    _innerDevelopmentGoals.skills.filter((s) => s.category === id)

export const loadData = async (url = '/content.json') => {
    _innerDevelopmentGoals = (await fetch(url).then((response) =>
        response.json(),
    )) as unknown as Content
}

type Content = {
    categories: Category[]
    tools: Tool[]
    skills: Skill[]
}

let _innerDevelopmentGoals: Content = {
    // IDG colors use original colors, with added alpha transparency in two final characters
    categories: [],
    skills: [],
    tools: [],
}

export const getCategories = () => _innerDevelopmentGoals.categories
export const getSkills = () => _innerDevelopmentGoals.skills
export const getTools = () => _innerDevelopmentGoals.tools
