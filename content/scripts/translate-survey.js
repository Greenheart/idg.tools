// import { v3 } from '@google-cloud/translate'
// const translationClient = new v3()

import { google } from 'googleapis'
import key from './key.json' assert {
    type: 'json',
    integrity: 'sha384-ABC123'
}
import * as deepl from 'deepl-node'

// const input = `
// "Language Code";"Question";"Description"
// "en";"What skills are needed to reach the SDGs?";"Some description to give more context"
// `

// /* IMPORTING FROM GOOGLE DOCS */
// const importFromGoogleDocs = async () => {
//     const client = new google.auth.JWT(
//         key.googleDocs.client_email,
//         null,
//         key.googleDocs.private_key,
//         ['https://www.googleapis.com/auth/spreadsheets']
//     )

//     client.authorize((err, tokens) => {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         console.log('Authorized!')
//     })

//     const sheets = google.sheets({ version: 'v4', auth: client })

//     sheets.spreadsheets.values.get({
//         spreadsheetId: key.googleDocs.spreadsheet_id,
//         range: 'Ark2!F2:G2',
//     }, (err, res) => {
//         if (err) {
//             console.error(err)
//             return
//         }
//         const rows = res.data.values;
//         if (rows.length) {
//             console.log('Data:');
//             rows.map((row) => {
//                 console.log("===================\nQuestion in English:\n")
//                 console.log(row[0])
//                 console.log("===================\nDescription in English:\n")
//                 console.log(row[1])
//                 console.log("===================")
//                 return row
//                 // console.log(`${row[0]}, ${row[1]}`);
//             });
//         } else {
//             console.log('No data found.')
//         }
//     })
// }

// const sourceText = await importFromGoogleDocs()
// //console.log("Imported source question from google docs: " + sourceText)

const sourceTextTest = ["What was the question?", "And here is some description for the question. Can you authorize this?"]

/* TRNASLATING WITH DEEPL */
const translateWithDeepL = async (text, toLang) => {
    const translator = new deepl.Translator(key.deepl.auth_key)
    const translatedText = await translator.translateText(text, "EN", toLang)
    return translatedText
}

// // Need to loop over languages
let translatedText = {}
translatedText.de = await translateWithDeepL(sourceTextTest[0], "DE")
translatedText.es = await translateWithDeepL(sourceTextTest[0], "ES")
translatedText.pt_PT = await translateWithDeepL(sourceTextTest[0], "PT-BR")// whatch out for Portugese!
translatedText.pt_BR = await translateWithDeepL(sourceTextTest[0], "PT-PT")
translatedText.sv = await translateWithDeepL(sourceTextTest[0], "SV")
translatedText.da = await translateWithDeepL(sourceTextTest[0], "DA")
translatedText.nb = await translateWithDeepL(sourceTextTest[0], "NB")// whatch out for Bokmål!
translatedText.en_GB = await translateWithDeepL(sourceTextTest[1], "EN-GB")
translatedText.en_US = await translateWithDeepL(sourceTextTest[1], "EN-US")

for (let lang in translatedText) {
    console.log(`${lang}:  ${translatedText[lang].text}`)
}

// Use the `csv` library from npm - this will help us with parsing and stringifying to cover edge cases
// https://csv.js.org/

// link to google sheet:
// https://docs.google.com/spreadsheets/d/1d9zmeMfAG0oDlFM6Ln6JGXd39Dqz1UM7-z1582Zwx3g/edit?usp=sharing

/** exported from google sheets via csv:
Language Code,Question,Description
en,What skills are needed to reach the SDGs?,Some description to give more context.
 **/

/** if there are commas present in the data, it looks like that:
Language Code,Question,Description
en,"What skills are needed, how about an intermediate sentence, to reach the SDGs?",Some description to give more context.


/**

const input = await readFile('input.csv')
const DELIMITER = ';'

const [header, sourceLang, ...rows] = input.trim().split('\n')

const englishStrings = sourceLang.split(DELIMITER).slice(1)

const translatedRows = rows.map((row) => {
    const [toLang, ...strings] = row.split(DELIMITER)
    const translatedStrings = englishStrings.map((sourceString) => {
        if (toLang supported by deepl) {
            return translateWithDeepL(sourceString, fromLang, toLang)
        } else {
            return translateWithGoogle(sourceString, fromLang, toLang)
        }
    })

    const translatedRow = [toLang, ...translatedStrings].join(DELIMITER)
    return translatedRow
})

const output = [header, sourceLang, ...translatedRows].join('\n')

await writeFile('output.csv', output)

// google supported language codes: https://cloud.google.com/translate/docs/languages
// Here are the deepl language codes: https://www.deepl.com/docs-api/general/get-languages/
/** retrieveing deepl actual languages from API:
curl  'https://api-free.deepl.com/v2/languages?type=target' -H 'Authorization: DeepL-Auth-Key [yourAuthKey]'



for each language (each row of the CSV file)// start from 3rd row (first is heading, second is English)
    for all strings (columns) of row
        const language = row.split(';')[]

        googleTranslate() // read always second row

    add a new line to the output


*/

// const projectId = ''
// We might be able to use the v2 API https://cloud.google.com/translate/docs/editions
// const translate = new v3.TranslationServiceClient({ projectId })

// TODO: Get supported languages
// TODO: Or get them from here: https://cloud.google.com/translate/docs/languages
// we need both language codes and language string names
// translate.getSupportedLanguages()

// TODO: use all supported languages as target languages when calling the translation API

// TODO: output the translations into the right format (CSV)

// const request = {
//     parent, // don't know what that is
//     soureceLanguageCode,// language codes: https://cloud.google.com/translate/docs/languages follows ISO-639 code
//     targetLanguageCode,
//     inputConfigs,
//     outputConfig,
// }

// const [operation] = await translationClient.translateText( request )
// const [response] = await operation.promise()
