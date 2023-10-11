import type { CommunityContent, Locale, Localised, ToolsContent } from '$shared/types'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { BuilderInput, BUILDERS } from './build/builders'
import { BUNDLE_LOADERS } from './build/loaders'

type Bundle<T> = {
    load: <T>(builderInput: BuilderInput<T>) => Promise<Localised<T>>
    build: <T>(content: Localised<T>, builderInput: BuilderInput<T>) => Promise<void>
    selectedContent: (keyof T)[]
    watchPaths: string[]
}

function getWatchPaths<T>(selectedContent: (keyof T)[]) {
    const special = {
        featured: 'settings',
    }
    return selectedContent.map((contentType) => {
        const specialPath = special[contentType as keyof typeof special]
        return specialPath ? specialPath : contentType
    }) as string[]
}

function createBundle<T>(
    load: Bundle<T>['load'],
    build: Bundle<T>['build'],
    selectedContent: Bundle<T>['selectedContent'],
): Bundle<T> {
    const watchPaths = getWatchPaths<T>(selectedContent)
    return { load, build, selectedContent, watchPaths }
}

/**
 * Bundles encapsulate all configuration needed to create specific content bundles.
 */
const BUNDLES = {
    // Maybe the functions could be passed in with a more specific type than any
    community: createBundle<CommunityContent>(
        BUNDLE_LOADERS.community as any,
        BUILDERS.community as any,
        ['stories', 'contributors', 'dimensions', 'tags', 'featured'],
    ),
    tools: createBundle<ToolsContent>(BUNDLE_LOADERS.tools as any, BUILDERS.tools as any, [
        'tools',
        'skills',
        'dimensions',
        'tags',
    ]),
}

type BundleName = keyof typeof BUNDLES
const BUNDLE_NAMES = Object.keys(BUNDLES) as BundleName[]

const __dirname = dirname(fileURLToPath(import.meta.url))
const contentDir = resolve(__dirname, '../../src')

// TODO: Document how to update the selected Locales that should be published.
// At the moment this is important for adding new translations of the IDG framework.
const SELECTED_LOCALES: Locale[] = [
    'en',
    'es',
    'nl',
    'sv',
    'pt',
    'pt-BR',
    'it',
    'fi',
    'ja',
    'dk',
    'de',
    'fr',
]

async function runBundle(selectedBundle: BundleName) {
    const bundle = BUNDLES[selectedBundle]
    const input = {
        // TODO: Temporarily only build EN content for community since we don't use other locales there yet.
        selectedLocales: selectedBundle === 'tools' ? SELECTED_LOCALES : (['en'] as Locale[]),
        contentDir,
        selectedContent: bundle.selectedContent,
    }

    const localisedContent = await bundle.load(input)
    await bundle.build(localisedContent as any, input)
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

    if (!bundles.length) bundles = BUNDLE_NAMES

    if (path) {
        const shouldBuild = hasMatchingPath(path)
        // If a path just changed, we only re-execute the bundles that are using that type of content
        bundles = bundles.filter((bundle) => BUNDLES[bundle].watchPaths.some(shouldBuild))
    }

    return build(bundles)
}
