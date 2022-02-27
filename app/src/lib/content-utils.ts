import type { Category, Content, Skill, Tool } from './types'

export const getCategory = (id: Category['id'], { categories }: Content) =>
    categories.find((c) => c.id === id) as Category

export const getSkill = (id: Skill['id'], { skills }: Content) =>
    skills.find((s) => s.id === id) as Skill

/**
 * By supporting backwards compatible links that end with a `cuid.slug()`,
 * we make it possible to find the same tool in multiple ways:
 * 1) /explore/finding-your-inner-compass-105l07u
 * 2) /explore/invalid-or-old-name-still-works-105l07u
 * 3) /explore/105l07u
 *
 * With the third case, we get built-in support for short URLs. Not that easy to type, but at least they are few characters.
 */
export const getToolByLink = (link: Tool['link'], { tools }: Content) =>
    tools.find((t) => t.link === link || link.endsWith(t.slug)) as Tool

export const getSkillsInCategory = (id: Category['id'], { skills }: Content) =>
    skills.filter((s) => s.category === id)
