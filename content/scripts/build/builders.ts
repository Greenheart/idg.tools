import { resolve } from 'path'
import type {
    CommunityContent,
    Locale,
    Localised,
    ToolsContent,
    WidgetContent,
} from '$shared/types'
import { runAllTransformers, transformContent, TRANSFORMERS } from './transformers'
import { writeJSON } from '../utils'
import { VALIDATORS } from './validators'

export type BuilderInput<T> = {
    selectedLocales: readonly Locale[]
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
        localisedContent: Localised<CommunityContent>,
        builderInput: BuilderInput<CommunityContent>,
    ) {
        const transformedContent = transformContent(
            localisedContent,
            (result, [locale, content]) => {
                const stories = runAllTransformers(
                    [
                        TRANSFORMERS.keepPublishedStories,
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
        localisedContent: Localised<ToolsContent>,
        builderInput: BuilderInput<ToolsContent>,
    ) {
        const transformedContent = transformContent(
            localisedContent,
            (result, [locale, content]) => {
                // HACK: temporarily disable transformations for other locales
                // This is needed to prevent crashes when critical content is missing
                const tools =
                    locale === 'en'
                        ? runAllTransformers(
                              [
                                  TRANSFORMERS.filterAndSortRelevancyScores(locale),
                                  TRANSFORMERS.sortEntityTagsAlphabetically(content.tags),
                                  TRANSFORMERS.updateLink,
                                  TRANSFORMERS.sortTools(content.skills),
                              ],
                              content.tools,
                          )
                        : []

                const tags =
                    locale === 'en'
                        ? runAllTransformers(
                              [
                                  TRANSFORMERS.keepRelevantTags(tools),
                                  TRANSFORMERS.sortTagsAlphabetically,
                              ],
                              content.tags,
                          )
                        : []

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

        // Only keep the localised content we care about to improve performance.
        // If we output content as separate files for each locale instead, that might solve this in a nicer way
        builderInput.selectedLocales.forEach((locale) => {
            if (locale === 'en') return
            // For other locales, we only keep the IDG Framework translations for dimensions and skills
            transformedContent[locale]!.tools = []
            transformedContent[locale]!.tags = []
        })

        await writeJSON(
            resolve(builderInput.contentDir, '../../tools/static/content.json'),
            transformedContent,
            0,
        )
    },
    async widget(
        localisedContent: Localised<WidgetContent>,
        builderInput: BuilderInput<WidgetContent>,
    ) {
        const transformedContent = transformContent(
            localisedContent,
            (result, [locale, content]) => {
                result[locale as Locale] = content
                return result
            },
        )

        await writeJSON(
            resolve(builderInput.contentDir, '../../innerdevelopmentgoals/src/lib/content.json'),
            transformedContent,
            0,
        )
    },
}
