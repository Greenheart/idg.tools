import type { CommunityContent, Localized, ToolsContent } from '$shared/types'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { BuilderInput, BUILDERS } from './build/builders'
import { BUNDLE_LOADERS } from './build/loaders'

type Bundle<T> = {
    load: (builderInput: BuilderInput) => Promise<Localized<T>>
    build: (content: Localized<T>, builderInput: BuilderInput) => Promise<void>
}

function createBundle<T>(load: Bundle<T>['load'], build: Bundle<T>['build']): Bundle<T> {
    return { load, build }
}

const BUNDLERS = {
    community: createBundle<CommunityContent>(BUNDLE_LOADERS.community, BUILDERS.community),
    tools: createBundle<ToolsContent>(BUNDLE_LOADERS.tools, BUILDERS.tools),
}

// TODO: run all selectedBuilders based on CLI arguments. Default to run all.
export default async function run() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const contentDir = resolve(__dirname, '../../src')

    const selectedBundler = 'tools'
    const bundler = BUNDLERS[selectedBundler]

    const builderInput: BuilderInput = { selectedLocales: ['en'], contentDir }

    const localizedContent = await bundler.load(builderInput)
    await bundler.build(localizedContent, builderInput)
}
