import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import content from '../static/content.json' with { type: 'json' }
import { format } from 'prettier'

// This assumes all dimensions and skills are the same as for the English locale.
// This script likely needs to be updated for the new framework.
const { dimensions } = content['en']

/**
 * This might need to be updated to include all known dimensions.
 * It should align with the latest Map<Dimension['id'] | Skill['id'], DimensionSlug>
 */
export const COLORS = {
    da0: 'being',
    sa0: 'being',
    sa1: 'being',
    sa2: 'being',
    sa3: 'being',
    sa4: 'being',
    da1: 'thinking',
    sa5: 'thinking',
    sa6: 'thinking',
    sa7: 'thinking',
    sa8: 'thinking',
    sa9: 'thinking',
    da2: 'relating',
    sb0: 'relating',
    sb1: 'relating',
    sb2: 'relating',
    sb3: 'relating',
    da3: 'collaborating',
    sb4: 'collaborating',
    sb5: 'collaborating',
    sb6: 'collaborating',
    sb7: 'collaborating',
    sb8: 'collaborating',
    da4: 'acting',
    sb9: 'acting',
    sc0: 'acting',
    sc1: 'acting',
    sc2: 'acting',
}

async function getSVGSymbol(dimension, skillId) {
    const index = skillId ? dimension.skills.findIndex((id) => id === skillId) + 1 : 0
    const raw = await readFile(
        resolve(import.meta.dirname, `../static/symbols/${COLORS[dimension.id]}_${index}.svg`),
        'utf-8',
    )

    const svgPaths = raw
        .split('\n')
        .slice(1, -1)
        .map((x) => x.trim().replace('<path d="', '').replace('"/>', ''))

    return [skillId ? skillId : dimension.id, svgPaths]
}

const symbols = await Promise.all(
    dimensions.flatMap((dimension) => [
        getSVGSymbol(dimension),
        ...dimension.skills.map((skill) => getSVGSymbol(dimension, skill)),
    ]),
).then((res) => res.reduce((result, [id, paths]) => ({ ...result, [id]: paths }), {}))

await writeFile(
    resolve(import.meta.dirname, '../static/symbols.json'),
    JSON.stringify(symbols),
    'utf-8',
)

const formatted = await format(
    `/** Symbols for the 2023 version of the IDG Framework */\nexport const allSymbols = ${JSON.stringify(symbols)}`,
    { semi: false, singleQuote: true, tabWidth: 2, parser: 'typescript' },
)
await writeFile(
    resolve(import.meta.dirname, '../../innerdevelopmentgoals/src/lib/symbols.ts'),
    formatted,
    'utf-8',
)
