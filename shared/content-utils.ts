import type { Category, Content, Skill, Tag, Tool } from './content-types'
import type * as Runtime from './runtime-types'

export const getCategory = (
    id: Category['id'],
    { categories }: Pick<Content, 'categories'>,
) => categories.find((c) => c.id === id) as Category

export const getSkill = (
    id: Skill['id'],
    { skills }: Pick<Content, 'skills'>,
) => skills.find((s) => s.id === id) as Skill

export const getTag = (id: Tag['id'], { tags }: Pick<Content, 'tags'>) =>
    tags.find((t) => t.id === id) as Tag

/**
 * By supporting backwards compatible links that end with a `cuid.slug()`,
 * we make it possible to find the same tool in multiple ways:
 * 1) /explore/finding-your-inner-compass-105l07u
 * 2) /explore/invalid-or-old-name-still-works-105l07u
 * 3) /explore/105l07u
 *
 * With the third case, we get built-in support for short URLs. Not that easy to type, but at least they are few characters.
 */
export const getToolByLink = (
    link: Runtime.Tool['link'],
    { tools }: Pick<Runtime.Content, 'tools'>,
) => tools.find((t) => t.link === link || link.endsWith(t.slug)) as Runtime.Tool

export const getSkillsInCategory = (
    id: Category['id'],
    { skills }: Pick<Content, 'skills'>,
) => skills.filter((s) => s.category === id)
