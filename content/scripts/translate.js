import * as deepl from 'deepl-node'
import dotenv from 'dotenv'
import { v2 } from '@google-cloud/translate'
import { parse, stringify } from 'csv/sync'

import { readFile, writeFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: resolve(__dirname, '..', '.env') })

const deeplTranslate = new deepl.Translator(process.env.DEEPL_API_KEY)
const googleTranslate = new v2.Translate()

/**
 * 1. read config csv file to learn which languages are supported
 * 2. translate from EN to all the source languages. Translate with DeepL if supported, otherwise Google
 * 3. write all results to CSV file
 * 4. upload manually to google sheet where peer review happens
 */

const config = await readFile(resolve(__dirname, 'data/survey.csv'), { encoding: 'utf-8' })

const records = parse(config, { columns: true, skip_empty_lines: true, delimiter: ',' })

/**
 * Ignore these keys when translating
 */
const SYSTEM_KEYS = [
    'GoogleLanguage',
    'GoogleLanguageCode',
    'DeepLLanguageCode',
    'DeepLLanguageName',
    'DeepLFormalitySupport',
]

const translateWithDeepL = async (texts, toLang) => {
    const translatedTexts = await deeplTranslate.translateText(texts, 'EN', toLang)
    return translatedTexts.map(({ text }) => text)
}

const translateWithGoogle = async (texts, toLang) => {
    const [results] = await googleTranslate.translate(texts, {
        from: 'en',
        to: toLang,
    })
    return results
}

const translateRecords = async (records) => {
    const source = records[0]
    const updatedRecords = [source]

    for (const record of records.slice(1)) {
        const updated = { ...record }

        const translate = record.DeepLLanguageCode ? translateWithDeepL : translateWithGoogle
        const targetLang = record.DeepLLanguageCode
            ? record.DeepLLanguageCode
            : record.GoogleLanguageCode

        const actualKeys = Object.keys(record).filter((key) => {
            if (source[key] === '') return false
            if (SYSTEM_KEYS.includes(key)) return false
            return true
        })

        const translated = await translate(
            actualKeys.map((key) => source[key]),
            targetLang.trim(),
        )

        actualKeys.forEach((key, i) => {
            updated[key] = translated[i]
        })

        updatedRecords.push(updated)
    }

    return updatedRecords
}

const updated = await translateRecords(records)

const output = stringify(updated, { delimiter: ',', header: true })

await writeFile(resolve(__dirname, `data/${Date.now()}-2023-05-26-translated-survey.csv`), output, {
    encoding: 'utf-8',
})
