import FastGlob from 'fast-glob'
import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import slugify from 'slugify'

import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'
import type { Tag } from '$shared/types'

export const slugifyName = (string: string, locale = DEFAULT_LOCALE_IDENTIFIER) =>
    slugify(string, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: undefined, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
        locale, // locale identifier of the locale to use
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
    locale = DEFAULT_LOCALE_IDENTIFIER,
) => `${slugifyName(name, locale)}-${uniqueSlug}`

export const readJSON = (path: string) => readFile(path, { encoding: 'utf-8' }).then(JSON.parse)

export const writeJSON = (path: string, data: any, indentation: number = 0) =>
    writeFile(path, JSON.stringify(data, null, indentation), {
        encoding: 'utf-8',
    })

export const getPaths = (...paths: string[]) => FastGlob(resolve(...paths))

/**
 * Ensures the url works in the live app or website by removing the full prefix added by the CMS.
 */
export const getConsistentAssetURL = (url: string, unwantedPrefix: string) =>
    url.replace(unwantedPrefix, '')

export const sortNamesAlphabetically = (a: Tag, b: Tag) => a.name.localeCompare(b.name)

export const getTagsSortedAlphabetically = (tags: Tag[]) =>
    tags.slice().sort(sortNamesAlphabetically)
