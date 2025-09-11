import type { IDGColorMap, ToolsContent, Localised } from '$shared/types'
import { resolve } from 'path'
import { readJSON, writeJSON } from './utils'

const inputFile = resolve(import.meta.dirname, '../../tools/static/content.json')
const outputFile = resolve(import.meta.dirname, `../../shared/colors.json`)

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
