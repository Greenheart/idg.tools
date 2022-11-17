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

// NOTE: We currently only build the English content since no translations are available yet
const SELECTED_LANGUAGES: Language[] = ['en']

const contentDir = resolve(__dirname, '../../src')

async function build(selectedBuilders: BuilderName[]) {
    const startTime = performance.now()

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

    const updatedProjects = selectedBuilders
        .map((b) => `IDG.${b}`)
        .join(' and ')
    console.log(`✅ Built content for ${updatedProjects} in ${buildTime} s\n`)
}

export default async function run(
    selectedBuilders: BuilderName[] = BUILDER_NAMES,
    path: string,
) {
    // Remove any invalid arguments
    selectedBuilders = selectedBuilders.filter((b) => BUILDER_NAMES.includes(b))

    if (!selectedBuilders.length) {
        selectedBuilders = BUILDER_NAMES
    }

    if (path) {
        // If a path just changed, we only re-execute the builders that are using that type of content
        selectedBuilders = selectedBuilders.filter((builder) =>
            COLLECTIONS[builder].some((collection) =>
                path.includes(`/${collection}/`),
            ),
        )
    }

    return build(selectedBuilders)
}
