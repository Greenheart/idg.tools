import slugify from 'slugify'
import { writeFile, readFile } from 'fs/promises'

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

export const readJSON = (path: string) =>
    readFile(path, { encoding: 'utf-8' }).then(JSON.parse)

export const writeJSON = (path: string, data: any, indentation: number = 0) =>
    writeFile(path, JSON.stringify(data, null, indentation), {
        encoding: 'utf-8',
    })
