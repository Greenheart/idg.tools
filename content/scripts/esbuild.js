import esbuild from 'esbuild'

const startTime = performance.now()

console.log(`⚡ Building IDG.tools content scripts...`)

esbuild
    .build({
        entryPoints: ['scripts/build-content.ts'],
        outdir: 'compiled',
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
