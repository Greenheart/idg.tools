import { resolve } from 'node:path'
import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        alias: {
            $shared: resolve('../shared'),
            '$shared/*': resolve('../shared'),
        },
        typescript: {
            config: (config) => {
                config.include ??= []
                config.include.push(
                    // Add shared code and types
                    '../shared/**/*.ts',
                    // Make sure to include scripts in the genrerated tsconfig.json to enable type checking
                    'scripts',
                )
            },
        },
    },
}

export default config
