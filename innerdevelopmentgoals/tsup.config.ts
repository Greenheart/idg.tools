import { defineConfig, Options } from 'tsup'
import svelte from 'esbuild-svelte'

const baseConfig = {
    clean: true,
    esbuildPlugins: [svelte()],
    platform: 'browser',
    external: [],
    loader: {
        '.woff2': 'copy',
    },
} satisfies Options

export default defineConfig([
    {
        ...baseConfig,
        entry: { index: 'src/lib/index.ts' },
        format: 'esm',
        dts: true,
        external: [...baseConfig.external, 'bits-ui', 'svelte'],
        bundle: false,
    },
    {
        ...baseConfig,
        entry: { 'index.min': 'src/lib/index.ts' },
        format: 'iife',
        minify: true,
        bundle: true,
    },
])
