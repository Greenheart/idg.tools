import * as XLSX from 'xlsx/xlsx.mjs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'csv/sync'
import * as fs from 'fs'
import { readFile } from 'fs/promises'

XLSX.set_fs(fs)

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = await readFile(
    resolve(__dirname, 'data/1685087187937-2023-05-26-translated-survey.csv'),
    { encoding: 'utf-8' },
)

const languages = parse(config, { columns: true, skip_empty_lines: true, delimiter: ',' })

const workbook = XLSX.utils.book_new()

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

const source = languages[0]

languages.slice(1).forEach((translation) => {
    const rows = Object.entries(translation)
        .filter(([key]) => !SYSTEM_KEYS.includes(key))
        .map(([key, value]) => ({
            Key: key,
            English: source[key],
            [translation.GoogleLanguage]: value,
        }))

    // For each of the languages (each row in the CSV file), add a worksheet with the language code
    const worksheet = XLSX.utils.json_to_sheet(rows)

    /* fix headers */
    XLSX.utils.sheet_add_aoa(worksheet, [['Key', 'English', translation.GoogleLanguage]], {
        origin: 'A1',
    })

    worksheet['!cols'] = [{ wch: 50 }]

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        `${translation.GoogleLanguage} (${translation.GoogleLanguageCode})`,
    )
})

XLSX.writeFile(workbook, resolve(__dirname, `data/${Date.now()}-IDG-survey.xlsx`))
