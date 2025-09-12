import { resolve } from 'path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-vercel'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess()],
    kit: {
        adapter: adapter(),
        alias: {
            $components: resolve('src/components'),
            $shared: resolve('../shared'),
            '$shared/*': resolve('../shared'),
        },
        env: {
            dir: '.',
            publicPrefix: 'PUBLIC_',
        },
        typescript: {
            config: (config) => {
                config.include ??= []
                config.include.push(
                    // Shared code and types
                    '../shared/**/*.svelte',
                    '../shared/**/*.ts',
                    '../shared/**/*.js',
                )
            },
        },
    },
    // vitePlugin: {
    //     experimental: {
    //         inspector: true,
    //     },
    // },
}

export default config
