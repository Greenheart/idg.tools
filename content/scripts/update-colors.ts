import type { IDGColorMap, ToolsContent, Localised } from '$shared/types'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readJSON, writeJSON } from './utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputFile = resolve(__dirname, '../../tools/static/content.json')
const outputFile = resolve(__dirname, `../../shared/colors.json`)

async function buildIDGColors({ dimensions }: ToolsContent) {
    const COLORS = dimensions.reduce((COLORS, dimension) => {
        const colorName = dimension.name.toLowerCase() as IDGColorMap[string]
        COLORS[dimension.id] = colorName
        dimension.skills.forEach((skillId) => {
            COLORS[skillId] = colorName
        })
        return COLORS
    }, {} as IDGColorMap)

    return writeJSON(outputFile, COLORS)
}

const content = (await readJSON(inputFile)) as Required<Localised<ToolsContent>>

await buildIDGColors(content['en'])

console.log(`✅ Updated IDG colors in "shared/colors.json"`)
