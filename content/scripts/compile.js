import esbuild from 'esbuild'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

esbuild
    .build({
        entryPoints: [
            resolve(__dirname, 'build-content.ts'),
            // resolve(__dirname, 'update-colors.ts'),
            resolve(__dirname, 'copy-locale.ts'),
        ],
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
