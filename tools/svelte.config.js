import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [preprocess({ postcss: true })],
    kit: {
        adapter: adapter(),
        alias: {
            $components: resolve('src/components'),
            $shared: resolve('../shared'),
        },
        env: {
            dir: '.',
            publicPrefix: 'PUBLIC_',
        },
        outDir: 'dist',
    },
    vitePlugin: {
        experimental: {
            inspector: true,
        },
    },
}

export default config
