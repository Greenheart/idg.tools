import esbuild from 'esbuild'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const startTime = performance.now()

console.log(`1. ⚡ Compiling IDG.tools content scripts...`)

esbuild
    .build({
        entryPoints: [resolve(__dirname, 'build-content.ts')],
        outdir: resolve(__dirname, 'compiled'),
        bundle: true,
        minify: false,
        sourcemap: false,
        splitting: false,
        format: 'esm',
        target: ['esnext'],
        platform: 'node',
        external: ['slugify', 'cuid', 'fast-glob'],
    })
    .then(async () => {
        const buildTime = (
            (performance.now() - startTime) /
            1000
        ).toLocaleString('en-US', {
            minimumFractionDigits: 3,
            maximumFractionDigits: 3,
        })
        console.log(`✅ Finished in ${buildTime} s\n`)
    })
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
