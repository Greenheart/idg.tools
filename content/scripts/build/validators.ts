import type { Localized, Story, Tool } from '$shared/types'

/**
 * Validators are run after transformations are complete, and are small functions to help us catch errors.
 * These functions should be clearly defined in purpose and naming.
 * Most importantly, if something severe is wrong, they should throw an error and abort the build.
 * For less important things, a warning may be sufficient.
 */
export const VALIDATORS = {
    /**
     * This is really important to make it easy to switch the language, but letting other parts of links work the same.
     * For example, by enforcing the same slug for all locales of content, we can let the user change their language, but still know which content they are trying to access.
     */
    ensureSlugsAreConsistentForAllLocales<T>(
        localizedContent: Localized<T>,
        contentTypes: (keyof T)[],
    ) {
        for (const contentType of contentTypes) {
            const occurences: Record<
                Tool['id'] | Story['id'],
                Set<Tool['slug'] | Story['slug']>
            > = {}

            // IDEA: This code could be a useful staring point if we want to display "this content is also available in X, Y, Z" or similar in the future.
            // Alternatively, we could just display all locales by default, falling back to a supported locale. Then encourage contributions, or listing other supported locales.
            for (const content of Object.values(localizedContent)) {
                // Might be able to find a better type than `any` here, but not worth it at this point.
                for (const entity of content[contentType] as any) {
                    if (!occurences[entity.id]) occurences[entity.id] = new Set()
                    occurences[entity.id].add(entity.slug)
                }
            }

            for (const [contentId, uniqueSlugs] of Object.entries(occurences)) {
                if (uniqueSlugs.size > 1) {
                    throw new Error(
                        `${String(
                            contentType,
                        )} with id ${contentId} need to have consistent slugs for all locales. Found slugs: ${Array.from(
                            uniqueSlugs,
                        )}`,
                    )
                }
            }
        }
    },
}
