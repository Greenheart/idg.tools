import type { Category, Content, Skill, Tool } from './types'

export const getCategory = (id: Category['id'], { categories }: Content) =>
    categories.find((c) => c.id === id) as Category

export const getSkill = (id: Skill['id'], { skills }: Content) =>
    skills.find((s) => s.id === id) as Skill

export const getToolBySlug = (slug: Tool['slug'], { tools }: Content) =>
    tools.find((t) => t.slug === slug) as Tool

export const getSkillsInCategory = (id: Category['id'], { skills }: Content) =>
    skills.filter((s) => s.category === id)
