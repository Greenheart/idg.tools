import FastGlob from 'fast-glob'
import cuid from 'cuid'
import slugify from 'slugify'
import { readFile, writeFile } from 'fs/promises'

import { TranslatedTool } from '../../shared/types'
import { DEFAULT_LANGUAGE_TAG } from '../../shared/constants'

export const slugifyName = (string: string, language = DEFAULT_LANGUAGE_TAG) =>
    slugify(string, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        locale: language, // language code of the locale to use
        trim: true, // trim leading and trailing replacement chars, defaults to `true`
    })

/**
 * Create a slugified, backwards compatible link.
 *
 * @param name Name of the object to link to. Can be updated easily while keeping links backwards compatible.
 * @param uniqueSlug cuid.slug() that should remain the same for an object as long as it exists in the database.
 * @returns Slugified link
 */
export const createBackwardsCompatibleLink = (
    name: string,
    uniqueSlug: string,
    language = DEFAULT_LANGUAGE_TAG,
) => `${slugifyName(name, language)}-${uniqueSlug}`

// IDEA: Maybe generate slugs and links for entries before build

const toolPaths = (await FastGlob('./src/tools/*.json')).filter(
    (x) => !x.includes('old_'),
)

console.log(`Building ${toolPaths.length} tools...`)

const updateTool = (translatedTool: TranslatedTool) => {
    // Ensure slug is consistent across languages
    const slug = cuid.slug()
    const updatedTranslatedTool = {} as TranslatedTool

    console.log('before', translatedTool.en.slug, translatedTool.en.link)

    for (const [language, tool] of Object.entries(translatedTool)) {
        const lang = language as keyof TranslatedTool
        updatedTranslatedTool[lang] = { ...tool }
        updatedTranslatedTool[lang].slug = slug
        // @ts-expect-error skills does exist on old tools
        delete updatedTranslatedTool[lang].skills
        // Delete category since it's no longer used
        updatedTranslatedTool[lang].relevancy = tool.relevancy
            .filter((r) => Boolean(r.score))
            .map((r) => ({
                ...r,
                category: undefined,
            }))
        updatedTranslatedTool[lang].link = createBackwardsCompatibleLink(
            tool.name,
            slug,
        )
    }

    console.log(
        'UPDATED',
        updatedTranslatedTool.en.slug,
        updatedTranslatedTool.en.link,
    )

    return updatedTranslatedTool
}

await Promise.all(
    toolPaths.map(async (path) => {
        const translatedTool = await readFile(path, { encoding: 'utf-8' }).then(
            (raw) => JSON.parse(raw),
        )

        const updated = updateTool(translatedTool)

        return writeFile(path, JSON.stringify(updated, null, 2), {
            encoding: 'utf-8',
        })
    }),
)
