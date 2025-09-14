import { COLORS, NEW_COLORS, NEW_DIMENSION_IDS, NEW_SKILL_IDS } from '../../shared/constants.ts'
import { glob, readFile, writeFile, rename } from 'node:fs/promises'
import { resolve, basename } from 'node:path'

function getShortId(
    prefix: 'd' | 's',
    lowercase = 'abcdefghijklmnopqrstuvwxyz',
    numbers = '0123456789',
) {
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

type OldDimensionId = keyof typeof NEW_DIMENSION_IDS
type OldSkillId = keyof typeof NEW_SKILL_IDS

const dimensionId = getShortId('d')
const skillId = getShortId('s')

const allToolsFiles = await Array.fromAsync(glob('./src/tools/**/*.json'))
const allStoriesFiles = await Array.fromAsync(glob('./src/stories/**/*.json'))
const allSettingsFiles = await Array.fromAsync(glob('./src/settings/**/*.json'))

// TODO: Once everything is completed, update COLORS to use the new ids

await Promise.all(
    allToolsFiles
        .filter((path) => basename(path).replace('.json', '').length > 3)
        .map(async (path) => {
            let file = await readFile(path, 'utf-8')

            for (const [oldSkillId, newSkillId] of Object.entries(NEW_SKILL_IDS)) {
                file = file.replaceAll(oldSkillId, newSkillId)
            }

            await writeFile(path, file, 'utf-8')
        }),
)

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
