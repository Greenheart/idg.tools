import run from './compiled/build-content.js'

const selectedBuilders = process.argv.slice(2)

await run(selectedBuilders)
