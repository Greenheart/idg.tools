import type { IDGColorMap, ToolsContent, Translated } from '$shared/types'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readJSON, writeJSON } from './utils'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputFile = resolve(__dirname, '../../../tools/static/content.json')
const outputFile = resolve(__dirname, `../../../shared/colors.json`)

async function buildIDGColors({ dimensions }: ToolsContent) {
    const colors = dimensions.reduce((colors, dimension) => {
        const colorName = dimension.name.toLowerCase() as IDGColorMap[string]
        colors[dimension.id] = colorName
        dimension.skills.forEach((skillId) => {
            colors[skillId] = colorName
        })
        return colors
    }, {} as IDGColorMap)

    return writeJSON(outputFile, colors)
}

const content = (await readJSON(inputFile)) as Required<
    Translated<ToolsContent>
>

await buildIDGColors(content['en'])

console.log(`✅ Updated IDG colors in "shared/colors.json"`)
