import run from './build-content'

const selectedBuilders = process.argv.slice(2)

await run(selectedBuilders)
