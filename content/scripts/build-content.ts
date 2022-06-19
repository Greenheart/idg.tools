import FastGlob from 'fast-glob'
import { readFile, writeFile } from 'fs/promises'

import { TranslatedTool } from '../../shared/types'
import { createBackwardsCompatibleLink } from './utils'

// IDEA: Maybe generate slugs and links for entries before build

const toolPaths = (await FastGlob('./src/tools/*.json')).filter(
    (x) => !x.includes('old_'),
)

console.log(`Building ${toolPaths.length} tools...`)

await Promise.all(
    toolPaths.map(async (path) => {
        const translatedTool = await readFile(path, { encoding: 'utf-8' }).then(
            (raw) => JSON.parse(raw),
        )

        const result = {}

        return writeFile(path, JSON.stringify(result, null, 2), {
            encoding: 'utf-8',
        })
    }),
)
