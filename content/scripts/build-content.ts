import type { CommunityContent, Locale, Localized, ToolsContent } from '$shared/types'
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

const BUNDLES = {
    community: createBundle<CommunityContent>(BUNDLE_LOADERS.community, BUILDERS.community),
    tools: createBundle<ToolsContent>(BUNDLE_LOADERS.tools, BUILDERS.tools),
}

type BundleName = keyof typeof BUNDLES
const BUNDLE_NAMES = Object.keys(BUNDLES) as BundleName[]

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = resolve(__dirname, '../../src')

const SELECTED_LOCALES: Locale[] = ['en']

async function runBundle(selectedBundle: BundleName) {
    const bundle = BUNDLES[selectedBundle]
    const input: BuilderInput = { selectedLocales: SELECTED_LOCALES, contentDir }

    const localizedContent = await bundle.load(input)
    await bundle.build(localizedContent as any, input)
}

async function build(selectedBundles: BundleName[]) {
    const startTime = performance.now()

    await Promise.all(selectedBundles.map(runBundle))

    const buildTime = ((performance.now() - startTime) / 1000).toLocaleString('en-US', {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    })

    const updatedProjects = selectedBundles.map((b) => `IDG.${b}`).join(' and ')
    console.log(`✅ Built content for ${updatedProjects} in ${buildTime} s\n`)
}

const hasMatchingPath = (path: string) => (contentPath: string) => path.includes(`/${contentPath}`)

export default async function run(selectedBundles: BundleName[] = BUNDLE_NAMES, path: string) {
    // Remove invalid arguments
    let bundles = selectedBundles.filter((b) => BUNDLE_NAMES.includes(b))

    if (!bundles.length) {
        bundles = BUNDLE_NAMES
    }

    // TODO: Instead of relying on collections and singletons, let bundles define a set of paths they are watching for changes

    // if (path) {
    //     const shouldBuild = hasMatchingPath(path)
    //     // If a path just changed, we only re-execute the bundles that are using that type of content
    //     bundles = bundles.filter((builder) => {
    //         return (
    //             COLLECTIONS[builder].collections.some(shouldBuild) ||
    //             COLLECTIONS[builder].singletons.some(shouldBuild)
    //         )
    //     })
    // }

    return build(bundles)
}
