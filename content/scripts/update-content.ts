import FastGlob from 'fast-glob'
import cuid from 'cuid'
import { readFile, writeFile } from 'fs/promises'

import { createBackwardsCompatibleLink } from './utils'
import { TranslatedTool } from '../../shared/types'

// IDEA: Maybe generate slugs and links for entries before build

const toolPaths = (await FastGlob('./src/tools/*.json')).filter(
    (x) => !x.includes('old_'),
)

console.log(`Updating ${toolPaths.length} tools...`)

const updateTool = (translatedTool: TranslatedTool) => {
    // Ensure slug is consistent across languages
    const slug = cuid.slug()
    const updatedTranslatedTool = {} as TranslatedTool

    console.log('before', translatedTool.en.slug, translatedTool.en.link)

    for (const [language, tool] of Object.entries(translatedTool)) {
        const lang = language as keyof TranslatedTool
        updatedTranslatedTool[lang] = { ...tool }
        updatedTranslatedTool[lang].slug = slug
        // @ts-expect-error skills does exist on old tools
        delete updatedTranslatedTool[lang].skills
        // Delete category since it's no longer used
        updatedTranslatedTool[lang].relevancy = tool.relevancy
            .filter((r) => Boolean(r.score))
            .map((r) => ({
                ...r,
                category: undefined,
            }))
        updatedTranslatedTool[lang].link = createBackwardsCompatibleLink(
            tool.name,
            slug,
        )
    }

    console.log(
        'UPDATED',
        updatedTranslatedTool.en.slug,
        updatedTranslatedTool.en.link,
    )

    return updatedTranslatedTool
}

await Promise.all(
    toolPaths.map(async (path) => {
        const translatedTool = await readFile(path, { encoding: 'utf-8' }).then(
            (raw) => JSON.parse(raw),
        )

        const updated = updateTool(translatedTool)

        return writeFile(path, JSON.stringify(updated, null, 2), {
            encoding: 'utf-8',
        })
    }),
)
