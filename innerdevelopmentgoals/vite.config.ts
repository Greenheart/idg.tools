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
                // TODO: use the same outdir in the future, but also keep the original files for users who want them
                // We could use this to replace the embed widget on IDG.tools to reduce the number of incoming requests
                outDir: 'dist-js',
            },
        }),
}

export default defineConfig(async ({ mode, isPreview }) => {
    if (mode === 'library') {
        if (isPreview) {
            // Serve the demo site to showcase the latest library build
            const fs = await import('node:fs/promises')
            const demoDir = resolve(import.meta.dirname, 'demo')
            await fs.cp(resolve(import.meta.dirname, 'dist-js'), demoDir, { recursive: true })

            return defineConfig({})
        }

        return configs.library()
    }

    return configs.dev()
})

// Before: 469 kB transfer
// Local after in dev mode: 2,68 MB transferred, however that might be without compression
// After in preview mode: 589 kB => 25% more. Likely caused by the inlined fonts, and the overhead of using Svelte + bits-ui, compild into an UMD bundle.

// TODO: Allow fonts to be loaded from files instead of bundled as base64
// Additionally, we could detect if the fonts are already supported on the page and load them conditionally
// Or we could use two CSS imports, where the library user imports the widget CSS, and optionally fonts CSS (which loads the font files)
// This would likely reduce the build size since we don't have to load base64 fonts that are never used.
// See https://calendar.perfplanet.com/2018/performance-anti-patterns-base64-encoding/
