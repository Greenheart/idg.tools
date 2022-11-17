import chokidar from 'chokidar'
import debounce from 'lodash.debounce'

import run from './compiled/build-content.js'

const WATCH_PATTERN = 'src/**/*.json'

const selectedBuilders = process.argv.slice(2)
const watcher = chokidar.watch(WATCH_PATTERN, { ignoreInitial: true })

async function build(selectedBuilders, path) {
    await run(selectedBuilders, path).catch((err) => {
        console.error('[content] Build failed', err)
    })
}

const rebuild = debounce(build, 400)

watcher.on('all', async (_eventName, path) => {
    console.log(path)
    await rebuild(selectedBuilders, path)
})

watcher.on('error', (error) => {
    console.error('Watcher error:', error)
    console.error(error.stack)
})

watcher.once('ready', async () => {
    console.error('Watching', `"${WATCH_PATTERN}" ..`)
    await run(selectedBuilders)
})
