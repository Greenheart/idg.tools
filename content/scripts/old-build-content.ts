import { performance } from 'perf_hooks'
import { dirname, resolve } from 'path'

import type { Locale, ToolsCollections, CommunityCollections } from '$shared/types'
// import community from './builders/community'
// import tools from './builders/tools'
import { fileURLToPath } from 'url'
import { writeJSON } from './utils'

const BUILDER_NAMES = ['community', 'tools']
type BuilderName = typeof BUILDER_NAMES[number]
export type Builder<T> = (
    selectedLocales: Locale[],
    contentDir: string,
    selectedContent: T,
) => Promise<void>

const __dirname = dirname(fileURLToPath(import.meta.url))

const BUILDERS: Record<BuilderName, Builder<any>> = {
    // tools: tools as unknown as Builder<ToolsCollections>,
    // community: community as unknown as Builder<CommunityCollections>,
}

export const SINGLETONS = {
    featured: 'settings/featured',
}
export type SingletonName = keyof typeof SINGLETONS

const COLLECTIONS: Record<
    BuilderName,
    {
        collections: CommunityCollections | ToolsCollections
        singletons: SingletonName[]
    }
> = {
    tools: {
        collections: ['tools', 'skills', 'dimensions', 'tags'],
        singletons: [],
    },
    community: {
        collections: ['stories', 'contributors', 'dimensions', 'tags'],
        singletons: ['featured'],
    },
}

export const NON_LOCALIZED_COLLECTIONS: (CommunityCollections | ToolsCollections)[] = [
    'contributors',
] as unknown as (CommunityCollections | ToolsCollections)[]

export type SelectedContent = typeof COLLECTIONS[BuilderName]

// NOTE: We currently only build the English content since no other locales are available yet
const SELECTED_LANGUAGES: Locale[] = ['en']

const contentDir = resolve(__dirname, '../../src')

async function build(selectedBuilders: BuilderName[]) {
    const startTime = performance.now()

    await Promise.all(
        selectedBuilders.map(async (builder) => {
            const content = await BUILDERS[builder](
                SELECTED_LANGUAGES,
                contentDir,
                COLLECTIONS[builder],
            )

            const outputFile = resolve(__dirname, `../../../${builder}/static/content.json`)

            return writeJSON(outputFile, content)
        }),
    )

    const buildTime = ((performance.now() - startTime) / 1000).toLocaleString('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    })

    const updatedProjects = selectedBuilders.map((b) => `IDG.${b}`).join(' and ')
    console.log(`✅ Built content for ${updatedProjects} in ${buildTime} s\n`)
}

const hasMatchingPath = (path: string) => (contentPath: string) => path.includes(`/${contentPath}`)

export default async function run(selectedBuilders: BuilderName[] = BUILDER_NAMES, path: string) {
    // Remove any invalid arguments
    let builders = selectedBuilders.filter((b) => BUILDER_NAMES.includes(b))

    if (!builders.length) {
        builders = BUILDER_NAMES
    }

    if (path) {
        const shouldBuild = hasMatchingPath(path)
        // If a path just changed, we only re-execute the builders that are using that type of content
        builders = builders.filter((builder) => {
            return (
                COLLECTIONS[builder].collections.some(shouldBuild) ||
                COLLECTIONS[builder].singletons.some(shouldBuild)
            )
        })
    }

    return build(builders)
}
