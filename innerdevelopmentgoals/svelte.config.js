import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        adapter: adapter(),
        typescript: {
            config: (config) => {
                config.include ??= []
                config.include.push(
                    // Make sure to include scripts in the genrerated tsconfig.json to enable type checking
                    'scripts/**/*.{ts,js}',
                )
            },
        },
    },
}

export default config
