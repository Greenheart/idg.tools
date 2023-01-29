/*

Needs:

1. Load selected types of content (collections and singletons)
2. validate and normalize JSON content
    - For each content type, implement a `loader` and `transformers` (one or more callback functions to process the content)
    - When all content has been loaded, and transformed individually, it should be possible to run any kind of transformations
    - Maybe transformations all happen at the end, and are expected to take the full content,
    transforming i in some way, and then returning the updated content.
        - Then the next transformer will be run based on the output content from the previous transformer.
        - This would make content builders into a chain of content transformers
3. output ready content.json that matches the expected format for CommunityContent and ToolsContent

Maybe let the transformers operate on Translated<CommunityContent> or Translated<ToolsContent>
In this case, we can more easily compare between different languages. And we can still output the format we want in the end (one global object with all content for a given locale)


Create one module with loaders
    - loaders should take the names of selectedContent to be included in the bundle
    - loaders should know which selectedContent are collections vs singletons
    - loaders should know which selectedContent that should be loaded with translations, and also those that are the same across languages
    - loaders should return the content object mathcing

Create another module with transformers
    - each transformer is a function taking content in and transforming it, returning the updated content

Create another module with builders, where we use the right loaders and transformers to get the desired output bundles.
    - community
    - tools

*/

import type {
    CommunityContent,
    Contributor,
    Dimension,
    Locale,
    Skill,
    Story,
    Tag,
    Tool,
    Translated,
    AllContent,
} from '$shared/types'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { getPaths, readJSON, writeJSON } from './utils'

type LoaderInput = {
    contentDir: string
    locale: Locale
}

const loadJSONPaths = (paths: string[]) => Promise.all(paths.map(readJSON))

const loadLocalizedContent = <T>(
    contentType: keyof AllContent,
    { contentDir, locale }: LoaderInput,
): Promise<T[]> => getPaths(contentDir, `${contentType}/${locale}/*.json`).then(loadJSONPaths)

const LOADERS = {
    async contributors({ contentDir }: LoaderInput): Promise<Contributor[]> {
        return getPaths(contentDir, `contributors/*.json`).then(loadJSONPaths)
    },
    async tags(loaderInput: LoaderInput): Promise<Tag[]> {
        return loadLocalizedContent('tags', loaderInput)
    },
    async skills(loaderInput: LoaderInput): Promise<Skill[]> {
        return loadLocalizedContent('skills', loaderInput)
    },
    async dimensions(loaderInput: LoaderInput): Promise<Dimension[]> {
        return loadLocalizedContent('dimensions', loaderInput)
    },
    async tools(loaderInput: LoaderInput): Promise<Tool[]> {
        return loadLocalizedContent('tools', loaderInput)
    },
    async stories(loaderInput: LoaderInput): Promise<Story[]> {
        return loadLocalizedContent('stories', loaderInput)
    },
}

/**
 * Run all content transformations, passing the result forward until we get a final result.
 */
function applyAllTransformations<T>(fns: ((content: T) => T)[], initialValue: T) {
    return fns.reduce((prevResult, fn) => fn(prevResult), initialValue)
}

async function loadContent<T>({
    selectedLocales,
    contentDir,
}: {
    selectedLocales: Locale[]
    contentDir: string
}) {
    // Load all selectedLocales in parallell
    const loadedContent: [Locale, T][] = await Promise.all(
        selectedLocales.map(async (locale) => {
            const loaderInput = { locale, contentDir }
            // Load all content types in parallell to improve performance
            const [contributors, tags, skills, dimensions, tools, stories] = await Promise.all([
                LOADERS.contributors(loaderInput),
                LOADERS.tags(loaderInput),
                LOADERS.skills(loaderInput),
                LOADERS.dimensions(loaderInput),
                LOADERS.tools(loaderInput),
                LOADERS.stories(loaderInput),
            ])
            return [
                locale,
                {
                    contributors,
                    tags,
                    skills,
                    dimensions,
                    tools,
                    stories,
                } as T,
            ]
        }),
    )

    // Combine all locales into one object that is easier to work with during transformations
    return loadedContent.reduce((allContent, [locale, content]) => {
        allContent[locale] = content
        return allContent
    }, {} as Translated<T>)
}

export default async function run() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const contentDir = resolve(__dirname, '../../src')

    // TODO: Make sure it works well with multiple locales
    const SELECTED_LOCALES: Locale[] = ['en']
    // const SELECTED_LOCALES: Locale[] = ['en', 'sv']

    const content = await loadContent<CommunityContent>({
        selectedLocales: SELECTED_LOCALES,
        contentDir,
    })

    console.log(Object.keys(content))

    await writeJSON(resolve(__dirname, '../../test-content.json'), content, 2)
}

// New idea (2023-01-29)
// 1. Load Translated<ToolsContent | CommunityContent> which is set based on which content is loaded.
//      Only load the selected locales to improve performance
//      This loading happens by loaders for all content types
// 2. Builders are presets of transformations, and for each content bundle, there are a number of transformations specified. This will increase the ability to reuse code between content bundles.
// 3. Output either one big content.json file or one bundle for each locale - this can easily be changed in the future.
