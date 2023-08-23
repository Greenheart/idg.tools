import { getSkillsInDimension } from '$shared/content-utils'
import type { Dimension, Skill } from '$shared/types'

export function getIDGFrameworkData(dimensions: Dimension[], skills: Skill[]) {
    return {
        name: 'Inner Development Goals',
        children: dimensions.map((dimension) => {
            return {
                name: dimension.name,
                id: dimension.id,
                children: getSkillsInDimension(dimension.id, { skills }).map((skill) => ({
                    name: skill.name,
                    id: skill.id,
                    value: 3000,
                })),
            }
        }),
    }
}
