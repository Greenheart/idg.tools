import esbuild from 'esbuild'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

esbuild
    .build({
        entryPoints: [
            'build-tools-content.ts',
            'build-community-content.ts',
        ].map((path) => resolve(__dirname, path)),
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
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
