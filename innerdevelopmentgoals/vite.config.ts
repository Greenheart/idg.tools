import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

// IDEA: We might be able to use svelte-package to compile the Svelte code, and then combine it with Vite library mode to build the umd bundle
// https://stackoverflow.com/questions/75832641/how-to-compile-svelte-3-components-into-iifes-that-can-be-used-in-vanilla-js

// const baseConfig = {
//     plugins: [],
//     external: [/\.woff2$/],
// }

// const entries = [
//     {
//         input: './src/lib/index.ts',
//         output: './index.js',
//     },
//     {
//         input: './src/lib/index.ts',
//         output: './index.js',
//         format: 'es',
//     },
// ]

export default defineConfig({
    plugins: [sveltekit()],
    build: {
        // lib: {
        //     entry: ['./dist/index.js'],
        //     name: 'IDGFramework',
        //     formats: ['es'],
        // },
        // rollupOptions: entries.map(({ input, output, format = 'es' }) => ({
        //     input,
        //     output: {
        //         format,
        //         file: output,
        //         exports: 'auto',
        //     },
        //     external: baseConfig.external,
        //     plugins: baseConfig.plugins,
        // })),
        // rollupOptions: {
        //     input: './src/lib/index.ts',
        //     output:
        // }
    },
})
