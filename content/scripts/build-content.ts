import { performance } from 'perf_hooks'
import type { Language } from '$shared/types'

import community from './builders/community'
import tools from './builders/tools'

type BuilderNames = 'community' | 'tools'
export type Builder = (selectedLanguages: Language[]) => Promise<void>

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

await Promise.all(
    selectedBuilders.map((builder) => BUILDERS[builder](SELECTED_LANGUAGES)),
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
