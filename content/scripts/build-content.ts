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

import { getTag, getSortedStories } from '$shared/content-utils'
import type {
    CommunityContent,
    Contributor,
    Dimension,
    Locale,
    Skill,
    Story,
    Tag,
    Tool,
    Localized,
    AllContent,
    FeaturedContent,
} from '$shared/types'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import {
    createBackwardsCompatibleLink,
    getConsistentAssetURL,
    getPaths,
    readJSON,
    sortNamesAlphabetically,
    writeJSON,
} from './utils'

type LoaderInput = {
    contentDir: string
    locale: Locale
}

const loadJSONPaths = (paths: string[]) => Promise.all(paths.map(readJSON))

const loadLocalizedContent = <T>(
    contentType: Omit<keyof AllContent, 'contributors' | 'featured'>,
    { contentDir, locale }: LoaderInput,
): Promise<T[]> => getPaths(contentDir, `${contentType}/${locale}/*.json`).then(loadJSONPaths)

/**
 * Loaders are a set of functions responsible for loading specific content types.
 * Depending on the structure, some content types are localized while others are not.
 */
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
    async featured({ contentDir, locale }: LoaderInput): Promise<FeaturedContent> {
        return readJSON(resolve(contentDir, `settings/${locale}/featured.json`))
    },
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
            // TODO: Maybe create loader presets for different content bundles, to avoid loading content that won't be used by the current bundle.
            // This would allow us to only build the relevant content, and improve performance.
            const [contributors, tags, skills, dimensions, tools, stories, featured] =
                await Promise.all([
                    LOADERS.contributors(loaderInput),
                    LOADERS.tags(loaderInput),
                    LOADERS.skills(loaderInput),
                    LOADERS.dimensions(loaderInput),
                    LOADERS.tools(loaderInput),
                    LOADERS.stories(loaderInput),
                    LOADERS.featured(loaderInput),
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
                    featured,
                } as T,
            ]
        }),
    )

    // Combine all locales into one object that is easier to work with during transformations
    return loadedContent.reduce((allContent, [locale, content]) => {
        allContent[locale] = content
        return allContent
    }, {} as Localized<T>)
}

/**
 * Transformers process the content to prepare it for usage in the apps and websites.
 * Each transformer function should have a distinct purpose, and a clear name.
 *
 * They all follow the type signature (content: T) => T, meaning they process content and returns it in the same format.
 *
 * Some transformers may need additional arguments, for example other parts of preprocessed content.
 * These transformers then return the actual transformer function.
 *
 * Arguments are provided via a process called currying (https://en.wikipedia.org/wiki/Currying)
 */
const TRANSFORMERS = {
    keepPublishedStories(stories: Story[]) {
        return stories.filter((story) => story.publishedAt)
    },
    ensureTagsExist<T>(entities: Story[] | Tool[]) {
        return entities.map((entity) => {
            if (!entity.tags) {
                entity.tags = []
            }
            return entity as T
        })
    },
    ensureDimensionsExist(entities: Story[]) {
        return entities.map((entity) => {
            if (!entity.dimensions) {
                entity.dimensions = []
            }
            return entity
        })
    },
    ensureContributorsExist(entities: Story[]) {
        return entities.map((entity) => {
            if (!entity.contributors) {
                entity.contributors = []
            }
            return entity
        })
    },
    keepRelevantTags(entities: Story[] | Tool[]) {
        return (tags: Tag[]) =>
            tags.filter((tag) => entities.some((entity) => entity.tags.includes(tag.id)))
    },
    useConsistentStoryImageURLs(stories: Story[]) {
        return stories.map((story) => {
            story.image = getConsistentAssetURL(story.image, '/community/static')
            return story
        })
    },
    sortTagsAlphabetically(tags: Tag[]) {
        return <T>(entities: Story[] | Tool[]) =>
            entities.map((entity) => {
                const tagsSortedAlphabetically = entity.tags
                    .map((tag) => getTag(tag, { tags }))
                    .sort(sortNamesAlphabetically)
                    .map((tag) => tag.id)

                entity.tags = tagsSortedAlphabetically

                return entity as T
            })
    },
    /**
     * This processing enables one of the key features: backwards compatible links thanks to the slug staying the same
     * This also enables built-in short links.
     */
    updateLink<T>(entities: Story[] | Tool[]) {
        return entities.map((entity) => {
            const name = (entity as Story).title ?? (entity as Tool).name
            if (!name) {
                throw new Error(
                    `content with id "${entity.id}" has no title or name, needed for creating the link. Seems like some localized version of the content might be broken.`,
                )
            }
            const newLink = createBackwardsCompatibleLink(name, entity.slug)
            if (newLink !== entity.link) {
                if (entity.link !== undefined) {
                    console.warn(
                        `[content] Link has changed for "${name}" from old: "${entity.link}" to new: "${newLink}"`,
                    )
                }
                entity.link = newLink
            }
            return entity
        }) as T
    },
    sortStories(featured: FeaturedContent) {
        return (stories: Story[]) => getSortedStories(stories, featured)
    },
}

/**
 * Validators are run after transformations are complete, and are small functions to help us catch errors.
 * These functions should be clearly defined in purpose and naming.
 * Most importantly, if something severe is wrong, they should throw an error and abort the build.
 * For less important things, a warning may be sufficient.
 */
const VALIDATORS = {
    // For example:
    // Warn for duplicate tags - or just deal with it directly
    // remove relevancy scores that are not useful - maybe even add this as input validation in the CMS to prevent it from happening in the first place, to avoid confusion?
    // warn if some tags are unused - or simply remove them
    // warn if missing translation for locale - or let this appear in the localization software instead

    /**
     * This is really important to make it easy to switch the language, but letting other parts of links work the same.
     * For example, by enforcing the same slug for all locales of content, we can let the user change their language, but still know which content they are trying to access.
     */
    ensureSlugsAreConsistentForAllLocales(localizedContent: Localized<AllContent>) {
        const contentTypes: (keyof Pick<AllContent, 'tools' | 'stories'>)[] = ['tools', 'stories']
        for (const contentType of contentTypes) {
            const occurences: Record<
                Tool['id'] | Story['id'],
                Set<Tool['slug'] | Story['slug']>
            > = {}

            // IDEA: This code could be a useful staring point if we want to display "this content is also available in X, Y, Z" or similar in the future.
            // Alternatively, we could just display all locales by default, falling back to a supported locale. Then encourage contributions, or listing other supported locales.
            for (const content of Object.values(localizedContent)) {
                for (const entity of content[contentType]) {
                    if (!occurences[entity.id]) occurences[entity.id] = new Set()
                    occurences[entity.id].add(entity.slug)
                }
            }

            for (const [contentId, uniqueSlugs] of Object.entries(occurences)) {
                if (uniqueSlugs.size > 1) {
                    throw new Error(
                        `${contentType} with id ${contentId} need to have consistent slugs for all locales. Found slugs: ${Array.from(
                            uniqueSlugs,
                        )}`,
                    )
                }
            }
        }
    },
}

/**
 * Run all content transformations, passing the result forward until we get a final result.
 */
function applyAllTransformations<T>(fns: ((content: T) => T)[], initialValue: T) {
    return fns.reduce((prevResult, fn) => fn(prevResult), initialValue)
}

export default async function run() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const contentDir = resolve(__dirname, '../../src')

    // TODO: Maybe allow specifying selected locales from the outside. Or mayeb keep it like this for now.
    const SELECTED_LOCALES: Locale[] = ['en']
    // const SELECTED_LOCALES: Locale[] = ['en', 'sv']

    const localizedContent = await loadContent<CommunityContent>({
        selectedLocales: SELECTED_LOCALES,
        contentDir,
    })

    const transformedContent = Object.entries(localizedContent).reduce<Localized<CommunityContent>>(
        (result, [locale, content]) => {
            const stories = applyAllTransformations(
                [
                    TRANSFORMERS.keepPublishedStories,
                    TRANSFORMERS.ensureTagsExist,
                    TRANSFORMERS.ensureDimensionsExist,
                    TRANSFORMERS.ensureContributorsExist,
                    TRANSFORMERS.useConsistentStoryImageURLs,
                    TRANSFORMERS.sortTagsAlphabetically(content.tags),
                    TRANSFORMERS.updateLink,
                    TRANSFORMERS.sortStories(content.featured),
                ],
                content.stories,
            )

            const tags = applyAllTransformations(
                [TRANSFORMERS.keepRelevantTags(stories)],
                content.tags,
            )

            result[locale as Locale] = {
                ...content,
                stories,
                tags,
            }
            return result
        },
        {},
    )

    VALIDATORS.ensureSlugsAreConsistentForAllLocales(transformedContent as Localized<AllContent>)

    // TODO: Change output depending on which bundle we're building.
    const output = Object.entries(transformedContent).reduce<Localized<CommunityContent>>(
        (result, [locale, content]) => {
            result[locale as Locale] = {
                stories: content.stories,
                contributors: content.contributors,
                dimensions: content.dimensions,
                tags: content.tags,
                featured: content.featured,
            }
            return result
        },
        {},
    )

    await writeJSON(resolve(__dirname, '../../../community/static/content.json'), output, 0)
}

// New idea (2023-01-29)
// 1. Load Translated<ToolsContent | CommunityContent> which is set based on which content is loaded.
//      Only load the selected locales to improve performance
//      This loading happens by loaders for all content types
// 2. Builders are presets of transformations, and for each content bundle, there are a number of transformations specified. This will increase the ability to reuse code between content bundles.
// 3. Output either one big content.json file or one bundle for each locale - this can easily be changed in the future.
