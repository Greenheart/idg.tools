import * as deepl from 'deepl-node'
// import { v3 } from '@google-cloud/translate'

import { readFile, writeFile } from 'fs/promises'
import { resolve } from 'path'
import { parse, stringify } from 'csv/sync'

import key from './key.json' assert {
    type: 'json',
    integrity: 'sha384-ABC123'
}

// const translationClient = new v3()

/**
 * 1. read config csv file to learn which languages are supported
 * 2. translate from EN to all the source languages. Translate with DeepL if supported, otherwise Google
 * 3. write all results to CSV file
 * 4. upload manually to google sheet where peer review happens
 */

const config = await readFile(resolve('./scripts/data/survey.csv'), { encoding: 'utf-8' })

const records = parse(config, { columns: true, skip_empty_lines: true, delimiter: ';' })

// const example = {
//     GoogleLanguage: 'Galician',
//     GoogleLangugeCode: 'gl',
//     DeeplLanguageCode: '',
//     DeeplLanguageName: '',
//     DeeplFormalitySupport: '',
//     Question: '',
//     Description: ''
// }

// const sourceExample = {
//     GoogleLanguage: 'Original',
//     GoogleLangugeCode: '',
//     DeeplLanguageCode: '',
//     DeeplLanguageName: '',
//     DeeplFormalitySupport: '',
//     Question: 'What skills are needed, according to your opinion, to reach the SDG?',
//     Description: 'Some description to give more context'
// }

/**
 * Ignore these when translating
 */
const SYSTEM_KEYS = [
    'GoogleLanguage',
    'GoogleLangugeCode',
    'DeepLLanguageCode',
    'DeepLLanguageName',
    'DeepLFormalitySupport',
]

const translateWithDeepL = async (text, toLang) => {
    const translator = new deepl.Translator(key.deepl.auth_key)
    const translatedText = await translator.translateText(text, "EN", toLang)
    return translatedText.text
}

const translateWithGoogle = async (text, toLang) => {
    // TODO
    return ''
}

const translateRecords = async (records) => {
    const source = records[0]
    const updatedRecords = [source]

    for (const record of records.slice(1)) {
        const updated = { ...record }

        const translate = record.DeepLLanguageCode
            ? translateWithDeepL
            : translateWithGoogle
        const targetLang = record.DeepLLanguageCode ? record.DeepLLanguageCode : record.GoogleLangugeCode

        for (const [key, value] of Object.entries(record)) {
            if (SYSTEM_KEYS.includes(key)) continue


            updated[key] = await translate(source[key], targetLang)
        }

        updatedRecords.push(updated)
    }

    return updatedRecords
}

const updated = await translateRecords(records)

const output = stringify(updated, { delimiter: ';' })

await writeFile(resolve('./scripts/data/2023-05-17-translated-survey.csv'), output, { encoding: 'utf-8' })



