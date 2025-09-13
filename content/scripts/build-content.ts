import type {
    CommunityContent,
    Locale,
    Localised,
    ToolsContent,
    WidgetContent,
} from '$shared/types'
import { resolve } from 'path'
import { BuilderInput, BUILDERS } from './build/builders'
import { BUNDLE_LOADERS } from './build/loaders'
import { FRAMEWORK_AVAILABLE_LOCALES } from '$shared/constants'

type Bundle<T> = {
    load: <T>(builderInput: BuilderInput<T>) => Promise<Localised<T>>
    build: <T>(content: Localised<T>, builderInput: BuilderInput<T>) => Promise<void>
    watchPaths: string[]
    selectedContent: (keyof T)[]
    selectedLocales: readonly Locale[]
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
    selectedLocales: readonly Locale[],
): Bundle<T> {
    const watchPaths = getWatchPaths<T>(selectedContent)
    return { load, build, selectedContent, watchPaths, selectedLocales }
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
        ['en'], // Only build EN content for community since we don't use other locales there yet.
    ),
    tools: createBundle<ToolsContent>(
        BUNDLE_LOADERS.tools as any,
        BUILDERS.tools as any,
        ['tools', 'skills', 'dimensions', 'tags'],
        FRAMEWORK_AVAILABLE_LOCALES,
    ),
    widget: createBundle<WidgetContent>(
        BUNDLE_LOADERS.widget as any,
        BUILDERS.widget as any,
        ['dimensions', 'skills'],
        FRAMEWORK_AVAILABLE_LOCALES,
    ),
}

type BundleName = keyof typeof BUNDLES
const BUNDLE_NAMES = Object.keys(BUNDLES) as BundleName[]

const contentDir = resolve(import.meta.dirname, '../src')

async function runBundle(selectedBundle: BundleName) {
    const bundle = BUNDLES[selectedBundle]
    const input = {
        selectedLocales: bundle.selectedLocales,
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

/**
 * Get content bundle names to build. Removes invalid arguments.
 */
function getBundleNames(names: string[]): BundleName[] {
    const bundles = names.filter((b) => BUNDLE_NAMES.includes(b as BundleName)) as BundleName[]
    return bundles.length ? bundles : BUNDLE_NAMES
}

export default async function run(selectedBundles: string[] = BUNDLE_NAMES, path?: string) {
    let bundles = getBundleNames(selectedBundles)

    if (path) {
        const shouldBuild = hasMatchingPath(path)
        // If a path just changed, we only re-execute the bundles that are using that type of content
        bundles = bundles.filter((bundle) => BUNDLES[bundle].watchPaths.some(shouldBuild))
    }

    return build(bundles)
}
