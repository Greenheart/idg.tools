import FastGlob from 'fast-glob'
import { cp } from 'fs/promises'
import { dirname, resolve, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// How to use this script:

// 1. Specify the collections you want to copy.
const collections = ['dimensions', 'skills']
// 2. Add the Locale you want to copy from
const COPY_FROM = 'en'
// 3. Add the Locale you want to initialize with content from the Locale to COPY_FROM
const COPY_TO = 'pt-BR'

await Promise.all(
    collections.map(async (collection) => {
        console.log(`Copying ${collection} from "${COPY_FROM}" to "${COPY_TO}"`)
        return cp(
            resolve(`${__dirname}/../src/${collection}/${COPY_FROM}/`),
            resolve(`${__dirname}/../src/${collection}/${COPY_TO}/`),
            { recursive: true },
        )
    }),
)
