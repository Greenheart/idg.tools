import { readFile, writeFile } from 'fs/promises'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const DIRNAME = dirname(fileURLToPath(import.meta.url))

const CONTENT = await readFile(resolve(DIRNAME, '../static/content.json'), {
    encoding: 'utf-8',
}).then((raw) => JSON.parse(raw))

const LANGUAGES = ['en', 'sv']

/**
 * Populate translations for selected languages
 */
const prepareTranslations = (translation, languages = LANGUAGES) =>
    languages.reduce((result, language) => {
        result[language] = translation
        return result
    }, {})

const getFilename = (id) => `${id}.json`

await Promise.all(
    ['categories', 'skills', 'tools'].flatMap((type) =>
        CONTENT.tools.map((content) =>
            writeFile(
                resolve(
                    DIRNAME,
                    `../../content/src/${type}`,
                    getFilename(content.id),
                ),
                JSON.stringify(prepareTranslations(content), null, 2),
                { encoding: 'utf-8' },
            ),
        ),
    ),
)
