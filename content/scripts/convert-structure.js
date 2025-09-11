import { glob } from 'tinyglobby'
import { readFile, writeFile, mkdir, rm } from 'fs/promises'
import { dirname, resolve, basename } from 'path'

const collections = ['dimensions', 'skills', 'tags', 'tools', 'stories']

/**
 * This script converts selected collections to from working with the `single_files` config option in Netlify CMS.
 * Instead, content is converted to work with the `multiple_folders` config.
 *
 * This gives more flexibility compared to having all content in the same files.
 */
await Promise.all(
    collections.flatMap(async (collection) => {
        const paths = await glob([resolve(`${import.meta.dirname}/../src/${collection}/*.json`)])
        return paths.flatMap(async (path) => {
            const translatedContent = await readFile(path, { encoding: 'utf-8' }).then(JSON.parse)

            return Object.entries(translatedContent).flatMap(async ([locale, content]) => {
                await mkdir(resolve(dirname(path), locale), { recursive: true })
                await writeFile(
                    resolve(dirname(path), locale, basename(path)),
                    JSON.stringify(content, null, 4),
                    { encoding: 'utf-8' },
                )
                await rm(path)
            })
        })
    }),
)
