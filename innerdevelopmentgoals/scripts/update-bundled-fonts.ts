import { readFile, copyFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import pkg from '@fontsource-variable/inter/package.json' with { type: 'json' }

const packageDir = resolve(import.meta.dirname, '../node_modules/@fontsource-variable/inter')
const widgetCSSFilePath = resolve(import.meta.dirname, '../src/lib/widget.css')

const cssFile = await readFile(resolve(packageDir, 'index.css'), 'utf-8')
const widgetCSSFile = await readFile(widgetCSSFilePath, 'utf-8')

const fontFiles = Array.from(cssFile.matchAll(/url\(\.\/files\/([^)]+)/g)).map((match) => match[1])

const widgetFontsDir = 'fonts'

const startDelimiter = '/* font-declarations-start */'
const endDelimiter = '/* font-declarations-end */'

/**
 * Capture the content in between while preserving surrounding delimiters
 * to make it easy to update the widget CSS with the latest third-party CSS.
 */
const currentFontDeclarationsRegex = new RegExp(
    `${RegExp.escape(startDelimiter)}(.*?)${RegExp.escape(endDelimiter)}`,
    's',
)

if (!currentFontDeclarationsRegex.test(widgetCSSFile)) {
    throw new Error(
        'Failed to match widget CSS file. Delimiters might be missing/modified. Review the code and the regex.',
    )
}

const withUpdatedImports = cssFile.replace(/\.\/files/g, `./${widgetFontsDir}`)

const updatedWidgetCSSFile = widgetCSSFile.replace(
    currentFontDeclarationsRegex,
    `${startDelimiter}
/* Adapted from ${pkg.name}/index.css v${pkg.version} */
${withUpdatedImports}
${endDelimiter}`,
)

console.log(`Updating @font-face declarations from ${pkg.name} v${pkg.version}`)

await writeFile(widgetCSSFilePath, updatedWidgetCSSFile, 'utf-8')

console.log('Copying font files:', fontFiles)

await Promise.all(
    fontFiles.map((fontFile) =>
        copyFile(
            resolve(packageDir, 'files', fontFile),
            resolve(import.meta.dirname, '../src/lib', widgetFontsDir, fontFile),
        ),
    ),
)
