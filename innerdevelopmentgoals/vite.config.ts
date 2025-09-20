import { resolve } from 'node:path'
import { defineConfig } from 'vite'

/** Use different configs depending on the use-case, and only instantiate the config when needed */
const configs = {
    dev: async () =>
        defineConfig({
            plugins: [(await import('@sveltejs/kit/vite')).sveltekit()],
        }),
    library: async () =>
        defineConfig({
            plugins: [(await import('@sveltejs/vite-plugin-svelte')).svelte()],
            // TODO: Write a blog post and better documentation for this approach to create web components with Svelte:
            // https://stackoverflow.com/questions/75832641/how-to-compile-svelte-3-components-into-iifes-that-can-be-used-in-vanilla-js
            build: {
                lib: {
                    entry: resolve(import.meta.dirname, 'dist/index.js'),
                    name: 'IDGFramework',
                    fileName: 'components',
                },
                // TODO: use the same outdir in the future
                outDir: 'dist-js',
            },
        }),
}

if (process.argv) {
}

export default defineConfig(({ mode, isPreview }) => {
    if (mode === 'library') {
        if (isPreview) {
            // Serve the demo site to showcase the built library
            // TODO: Update the demo directory with latest build
            // TODO: Move index.html to a demo directory
            // TODO: Copy the latest dist files to the demo site
            // TODO: Gitignore the dist files in the demo directory since we don't publish the demo site.
            return defineConfig({})
        }

        return configs.library()
    }

    return configs.dev()
})

// Before: 469 kB transfer
// Local after in dev mode: 2,68 MB transferred, however that might be without compression
