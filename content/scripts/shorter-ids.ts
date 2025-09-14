import { COLORS } from '../../shared/constants.ts'
import { glob, readFile, writeFile, rename } from 'node:fs/promises'
import { resolve, basename } from 'node:path'

const lowercase = 'abcdefghijklmnopqrstuvwxyz'
const numbers = '0123456789'

function getShortId(prefix: 'd' | 's') {
    let letterIndex = 0
    let numberIndex = 0
    return function* generate() {
        while (letterIndex < lowercase.length) {
            // Use reminder back to the first number if we have used every value
            let number = numbers[numberIndex % numbers.length]
            numberIndex++

            // Detect when the number loops back to the first value to increment the letter index
            if (numberIndex > numbers.length - 1 && number === numbers[0]) {
                letterIndex++
            }

            let letter = lowercase[letterIndex]

            // If we have used all letters, break out from the generation
            if (!letter) return ''

            yield prefix + letter + number
        }
    }
}

const dimensionId = getShortId('d')
const skillId = getShortId('s')

const allDimensionFiles = await Array.fromAsync(glob('./src/dimensions/**/*.json'))
const allSkillFiles = await Array.fromAsync(glob('./src/skills/**/*.json'))

const NEW_DIMENSION_IDS = allDimensionFiles.slice(0, 5).reduce(
    (unique, path) => {
        const oldId = basename(path).replace('.json', '')
        unique[oldId] = dimensionId().next().value as string
        return unique
    },
    {} as Record<string, string>,
)

const NEW_SKILL_IDS = allSkillFiles.slice(0, 23).reduce(
    (unique, path) => {
        const oldId = basename(path).replace('.json', '')
        unique[oldId] = skillId().next().value as string
        return unique
    },
    {} as Record<string, string>,
)

// TODO: Once everything is completed, update COLORS to use the new ids
const NEW_COLORS = Object.fromEntries(
    Object.entries(COLORS).map(([oldId, dimensionSlug]) => [
        NEW_SKILL_IDS[oldId] ?? NEW_DIMENSION_IDS[oldId],
        dimensionSlug,
    ]),
)

function formatConstant(name: string, value: any) {
    return `
export const ${name} = ${JSON.stringify(value, null, 4)}
`
}

async function addConstants(path: string, constants: Record<string, any>) {
    let file = await readFile(path, 'utf-8')
    file += Object.entries(constants)
        .map(([name, value]) => formatConstant(name, value))
        .join('')
    await writeFile(path, file, 'utf-8')
}

await addConstants(resolve('../shared/constants.ts'), {
    NEW_COLORS,
    NEW_DIMENSION_IDS,
    NEW_SKILL_IDS,
})

// await Promise.all(
//     allDimensionFiles
//         .filter((path) => basename(path).replace('.json', '').length > 3)
//         .map(async (path) => {
//             const oldId = basename(path).replace('.json', '')

//             let file = (await readFile(path, 'utf-8')).replaceAll(oldId, newDimensionIds[oldId])

//             for (const [oldSkillId, newSkillId] of Object.entries(newSkillIds)) {
//                 file = file.replaceAll(oldSkillId, newSkillId)
//             }

//             const newPath = path.replace(oldId, newDimensionIds[oldId])
//             await rename(path, newPath)

//             await writeFile(newPath, file, 'utf-8')
//         }),
// )

// TODO: for each locale, for each dimension, update the file name and update the dimensionId within the file. Also update skills to new IDs
// For each locale, for each skill, update the file name, and update the skillId, as well as the dimensionId
// Use COLORS to generate a map of old dimensionIds with new DimensionIds, and old skillIds mapped to new skillIds
// generate these ids up front to keep them consistent across all files
// write the files at the end

// TODO: Also update skillIds and dimensionIds in other content forms, such as tools and stories

// ---------------------------------------------------------------------------------------------------------------

// the current system relies on sortable ids.
// The simple start is to manually create sortable keys, and once the new IDG framework structure is known,
// then switch to keeping the order in other ways than with the ID
// We might for example be able to sort skills in the CMS wirth an `order` prop, or by switching to keeping all skills within the same locale

// ---------------------------------------------------------------------------------------------------------------

// By replacing the IDs with 3 characters instead of 25, we reduce the amount of data for IDs by 88%
// As a comparison, the IDG.tools content bundle size decreased from 202529 characters to Y characters
// As a comparison, the widget content bundle size decreased from 130638 characters to Y characters
