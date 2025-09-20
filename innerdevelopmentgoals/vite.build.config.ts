import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    build: {
        // TODO: Write a blog post and better documentation for this approach to create web components with Svelte:
        // https://stackoverflow.com/questions/75832641/how-to-compile-svelte-3-components-into-iifes-that-can-be-used-in-vanilla-js
        lib: {
            entry: resolve(import.meta.dirname, 'dist/index.js'),
            name: 'IDGFramework',
            fileName: 'components',
        },
        outDir: 'dist-js',
    },
    plugins: [svelte()],
})
