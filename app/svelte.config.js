import preprocess from 'svelte-preprocess'
import { resolve } from 'path'
import adapter from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [preprocess({ postcss: true })],
    kit: {
        adapter: adapter({
            fallback: 'index.html',
        }),
        alias: {
            $components: resolve('src/components'),
            $shared: resolve('../shared'),
        },
        prerender: {
            default: true,
        },
    },
}

export default config
