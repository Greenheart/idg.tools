import { resolve } from 'path'
import type { CommunityContent, Locale, Localized, ToolsContent } from '$shared/types'
import { runAllTransformers, transformContent, TRANSFORMERS } from './transformers'
import { writeJSON } from '../utils'
import { VALIDATORS } from './validators'

export type BuilderInput<T> = {
    selectedLocales: Locale[]
    contentDir: string
    selectedContent: (keyof T)[]
}

/**
 * Builders creates different output bundles to be used by specific apps.
 * This allows the content to be reused in multiple contexts.
 *
 * Each builder is responsible for loading the right content, transforming and validating it, and finally saving the output.
 */
export const BUILDERS = {
    async community(
        localizedContent: Localized<CommunityContent>,
        builderInput: BuilderInput<CommunityContent>,
    ) {
        const transformedContent = transformContent(
            localizedContent,
            (result, [locale, content]) => {
                const stories = runAllTransformers(
                    [
                        TRANSFORMERS.keepPublishedStories,
                        TRANSFORMERS.ensureTagsExists,
                        TRANSFORMERS.ensureDimensionsExists,
                        TRANSFORMERS.ensureContributorsExists,
                        TRANSFORMERS.useConsistentStoryImageURLs,
                        TRANSFORMERS.sortEntityTagsAlphabetically(content.tags),
                        TRANSFORMERS.updateLink,
                        TRANSFORMERS.sortStories(content.featured),
                    ],
                    content.stories,
                )

                const tags = runAllTransformers(
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
        )

        VALIDATORS.ensureSlugsAreConsistentForAllLocales<CommunityContent>(transformedContent, [
            'stories',
        ])

        await writeJSON(
            resolve(builderInput.contentDir, '../../community/static/content.json'),
            transformedContent,
            0,
        )
    },
    async tools(
        localizedContent: Localized<ToolsContent>,
        builderInput: BuilderInput<ToolsContent>,
    ) {
        const transformedContent = transformContent(
            localizedContent,
            (result, [locale, content]) => {
                const tools = runAllTransformers(
                    [
                        TRANSFORMERS.ensureRelevancyExists,
                        TRANSFORMERS.filterAndSortRelevancyScores(locale),
                        TRANSFORMERS.ensureTagsExists,
                        TRANSFORMERS.sortEntityTagsAlphabetically(content.tags),
                        TRANSFORMERS.updateLink,
                        TRANSFORMERS.sortTools(content.skills),
                    ],
                    content.tools,
                )

                const tags = runAllTransformers(
                    [TRANSFORMERS.keepRelevantTags(tools), TRANSFORMERS.sortTagsAlphabetically],
                    content.tags,
                )

                result[locale as Locale] = {
                    ...content,
                    tools,
                    tags,
                }
                return result
            },
        )

        VALIDATORS.ensureSlugsAreConsistentForAllLocales<ToolsContent>(transformedContent, [
            'tools',
        ])

        await writeJSON(
            resolve(builderInput.contentDir, '../../tools/static/content.json'),
            transformedContent,
            0,
        )
    },
}
