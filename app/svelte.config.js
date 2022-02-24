import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [preprocess({ postcss: true })],
    kit: {
        adapter: adapter(),
        vite: {
            resolve: {
                alias: {
                    $components: resolve('src/components'),
                    $lib: resolve('src/lib'),
                },
            },
        },
    },
}

export default config
