import { performance } from 'perf_hooks'
import { dirname, resolve } from 'path'

import type { Language } from '$shared/types'
import community from './builders/community'
import tools from './builders/tools'
import { fileURLToPath } from 'url'

type BuilderNames = 'community' | 'tools'
export type Builder = (
    selectedLanguages: Language[],
    contentDir: string,
    outputFile: string,
) => Promise<void>

const __dirname = dirname(fileURLToPath(import.meta.url))

const BUILDERS: Record<BuilderNames, Builder> = {
    community,
    tools,
}

const startTime = performance.now()

let selectedBuilders = process.argv.slice(2) as unknown as BuilderNames[]

// If no builders specified by arguments, run all by default
if (!selectedBuilders.length) {
    selectedBuilders = ['tools', 'community']
}

// NOTE: We currently only build the English content since no translations are available yet
const SELECTED_LANGUAGES: Language[] = ['en']

const contentDir = resolve(__dirname, '../../src')

await Promise.all(
    selectedBuilders.map((builder) => {
        const outputFile = resolve(
            __dirname,
            `../../../${builder}/static/content.json`,
        )
        return BUILDERS[builder](SELECTED_LANGUAGES, contentDir, outputFile)
    }),
)

const buildTime = ((performance.now() - startTime) / 1000).toLocaleString(
    'en-US',
    {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    },
)

const updatedProjects = selectedBuilders.map((b) => `IDG.${b}`).join(' and ')
console.log(`✅ Built content for ${updatedProjects} in ${buildTime} s\n`)
