import { performance } from 'perf_hooks'
import type { Language } from '$shared/types'

// TODO: create a shared build-content that builds the content bundles that are passed as arguments
// For exampe, the arguments can be `tools` or `community`, and if nothing is specified, everything is built by default

// TODO: refactor the separate bundles that are imported dynamically and executed only if needed.
// This will allow to speed up the content build for specific sites

const startTime = performance.now()
const selectedBuilders = process.argv.slice(2)

// If no builders specified by arguments, run all by default
if (!selectedBuilders.length) {
    selectedBuilders.push('tools', 'community')
}

const SELECTED_LANGUAGES: Language[] = ['en']

await Promise.all(
    selectedBuilders.map(async (builder) => {
        const { build } = await import(`./builders/${builder}.js`)
        await build(SELECTED_LANGUAGES)
    }),
)

const buildTime = ((performance.now() - startTime) / 1000).toLocaleString(
    'en-US',
    {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
    },
)

const presentBuilders = selectedBuilders.map((b) => `IDG.${b}`).join(' and ')

console.log(`✅ Built content for ${presentBuilders} in ${buildTime} s\n`)
