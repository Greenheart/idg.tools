import { resolve } from 'path'
import { vitePreprocess } from '@sveltejs/kit/vite'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess()],
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
    },
    // vitePlugin: {
    //     experimental: {
    //         inspector: true,
    //     },
    // },
}

export default config
