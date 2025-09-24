import { resolve } from 'path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-vercel'
import { entries } from './src/routes/(minimal-layout)/[[locale]]/embed/framework/+page.server.ts'
import type { Config } from '@sveltejs/kit'

const frameworkEmbedEntries = [
    '/embed/framework',
    ...entries()
        .map(({ locale }) => (locale === 'en' ? null : `/${locale}/embed/framework`))
        .filter(Boolean),
] as `/${string}`[]

const config: Config = {
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
        prerender: {
            entries: ['*', ...frameworkEmbedEntries],
            handleUnseenRoutes: 'warn',
        },
    },
}

export default config
