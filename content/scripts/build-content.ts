import { performance } from 'perf_hooks'
import { dirname, resolve } from 'path'

import type {
    Language,
    ToolsCollections,
    CommunityCollections,
} from '$shared/types'
import community from './builders/community'
import tools from './builders/tools'
import { fileURLToPath } from 'url'

const BUILDER_NAMES = ['community', 'tools']
type BuilderName = typeof BUILDER_NAMES[number]
export type Builder<T> = (
    selectedLanguages: Language[],
    contentDir: string,
    outputFile: string,
    selectedCollections: T,
) => Promise<void>

const __dirname = dirname(fileURLToPath(import.meta.url))

const BUILDERS: Record<BuilderName, Builder<any>> = {
    tools: tools as Builder<ToolsCollections>,
    community: community as Builder<CommunityCollections>,
}

const COLLECTIONS: Record<
    BuilderName,
    CommunityCollections | ToolsCollections
> = {
    tools: ['tools', 'skills', 'dimensions', 'tags'],
    community: ['stories', 'events', 'contributors', 'dimensions', 'tags'],
}

const startTime = performance.now()
const args = process.argv.slice(2)

// The paths that changed, passed by Chokidar
const changedPaths = process.argv.filter((arg) => arg.endsWith('.json'))

let selectedBuilders = args.filter((arg) =>
    BUILDER_NAMES.includes(arg),
) as unknown as BuilderName[]

console.log('before', { changedPaths, selectedBuilders })

// If no builders specified by arguments, run all by default
if (!selectedBuilders.length) {
    selectedBuilders = ['tools', 'community'] as unknown as BuilderName[]

    // Only re-execute the builders whose content actually changed
    if (changedPaths.length) {
        selectedBuilders = selectedBuilders.filter((builder) =>
            changedPaths.some((path) =>
                COLLECTIONS[builder].some((collection) =>
                    path.includes(`/${collection}/`),
                ),
            ),
        )
    }
}

console.log('after', { changedPaths, selectedBuilders })

// NOTE: We currently only build the English content since no translations are available yet
const SELECTED_LANGUAGES: Language[] = ['en']

const contentDir = resolve(__dirname, '../../src')

await Promise.all(
    selectedBuilders.map((builder) => {
        const outputFile = resolve(
            __dirname,
            `../../../${builder}/static/content.json`,
        )

        return BUILDERS[builder](
            SELECTED_LANGUAGES,
            contentDir,
            outputFile,
            COLLECTIONS[builder],
        )
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
