import { resolve } from 'path'
import type {
    AllContent,
    CommunityContent,
    Contributor,
    Dimension,
    FeaturedContent,
    Locale,
    Localized,
    Skill,
    Story,
    Tag,
    Tool,
    ToolsContent,
} from '$shared/types'
import { getPaths, readJSON } from '../utils'
import type { BuilderInput } from './builders'

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
 * Content loaders are a set of functions responsible for loading specific content types.
 * Depending on the structure, some content types are localized while others are not.
 */
export const LOADERS = {
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

/**
 * Bundle loaders are responsible for loading the content types needed for specific bundles.
 * They return localized content that can be further processed.
 */
export const BUNDLE_LOADERS = {
    community: (builderInput: BuilderInput) => {
        return loadContent<CommunityContent>({
            ...builderInput,
            selectedContent: ['stories', 'contributors', 'dimensions', 'tags', 'featured'],
        })
    },
    tools: (builderInput: BuilderInput) => {
        return loadContent<ToolsContent>({
            ...builderInput,
            selectedContent: ['tools', 'skills', 'dimensions', 'tags'],
        })
    },
}

async function loadContent<T>({
    selectedLocales,
    selectedContent,
    contentDir,
}: {
    selectedLocales: Locale[]
    selectedContent: (keyof T)[]
    contentDir: string
}) {
    // Load all selectedLocales in parallell
    const loadedContent: [Locale, T][] = await Promise.all(
        selectedLocales.map(async (locale) => {
            const loaderInput = { locale, contentDir }
            // Load all content types in parallell to improve performance
            const loadedContent = await Promise.all(
                selectedContent.map((contentType) => {
                    return LOADERS[contentType as keyof typeof LOADERS](loaderInput)
                }),
            )

            const content = selectedContent.reduce<T>((result, contentType, i) => {
                // Might be a better type instead of `any` here.
                // Maybe define that T satisfies ToolsContent | CommunityContent or something like that.
                result[contentType] = loadedContent[i] as any
                return result
            }, {} as T)

            return [locale, content]
        }),
    )

    // Combine all locales into one object that is easier to work with during transformations
    return loadedContent.reduce((allContent, [locale, content]) => {
        allContent[locale] = content
        return allContent
    }, {} as Localized<T>)
}