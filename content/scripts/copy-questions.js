import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { glob } from 'tinyglobby'

const COPY_FROM = 'en'
const NEW_LOCALES = ['pt-BR', 'pt', 'it', 'nl', 'sv', 'es']

const skillPaths = await glob([resolve(`${import.meta.dirname}/../src/skills/${COPY_FROM}/*.json`)])

const skills = await Promise.all(
    skillPaths.map((path) => readFile(path, { encoding: 'utf-8' }).then(JSON.parse)),
)

const allSkills = skills.reduce((result, skill) => {
    result[skill.id] = skill
    return result
}, {})

await Promise.all(
    NEW_LOCALES.flatMap(async (copyTo) => {
        console.log(`Copying skill questions from "${COPY_FROM}" to "${copyTo}"`)

        return skills.flatMap(async ({ id }) => {
            const path = resolve(`${import.meta.dirname}/../src/skills/${copyTo}/${id}.json`)
            const skill = await readFile(path, {
                encoding: 'utf-8',
            }).then(JSON.parse)

            skill.questions = allSkills[skill.id].questions

            await writeFile(path, JSON.stringify(skill, null, 2), { encoding: 'utf-8' })
        })
    }),
)
