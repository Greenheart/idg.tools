import { parse, stringify } from 'csv/sync'
import { dirname, resolve } from 'path'
import { readFile, writeFile } from 'fs/promises'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = await readFile(resolve(__dirname, 'data/survey.csv'), { encoding: 'utf-8' })

const records = parse(config, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ',',
})

const output = stringify(records, { delimiter: ',', header: true })

await writeFile(resolve(__dirname, 'data/survey.csv'), output, {
    encoding: 'utf-8',
})
