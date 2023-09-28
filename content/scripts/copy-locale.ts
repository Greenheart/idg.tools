import { cp } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

import { LOCALE_IDENTIFIERS } from '../../shared/constants.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

// How to use this script:

// 1. Specify the collections you want to copy.
const collections = ['dimensions', 'skills']
// 2. Add the Locale you want to copy from
const COPY_FROM = 'en'
// 3. Add the new locales you want to initialize with content from the Locale COPY_FROM
// const NEW_LOCALES = ['pt']
// 3. Or filter out the ones that already have translations, and add the rest
const NEW_LOCALES = LOCALE_IDENTIFIERS.filter(
    (x) => !['pt-BR', 'pt', 'it', 'en', 'nl', 'sv', 'es'].includes(x),
)

await Promise.all(
    NEW_LOCALES.flatMap((copyTo) =>
        collections.map(async (collection) => {
            console.log(`Copying ${collection} from "${COPY_FROM}" to "${copyTo}"`)
            return cp(
                resolve(`${__dirname}/../../src/${collection}/${COPY_FROM}/`),
                resolve(`${__dirname}/../../src/${collection}/${copyTo}/`),
                { recursive: true },
            )
        }),
    ),
)
