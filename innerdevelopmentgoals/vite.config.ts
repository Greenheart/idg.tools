import { resolve } from 'node:path'
import { defineConfig } from 'vite'

/** Use different configs depending on the use-case, and only instantiate the config when needed */
const configs = {
    dev: async () =>
        defineConfig({
            plugins: [(await import('@sveltejs/kit/vite')).sveltekit()],
        }),
    library: async () => {
        const { svelte } = await import('@sveltejs/vite-plugin-svelte')

        return defineConfig({
            plugins: [svelte()],
            build: {
                lib: {
                    entry: resolve(import.meta.dirname, 'dist-svelte/index.js'),
                    name: 'IDGFramework',
                    fileName: 'framework',
                },
                outDir: 'dist',
                // Preserve files that were copied into the dist dir in earlier build steps
                emptyOutDir: false,
            },
        })
    },
}

export default defineConfig(async ({ mode, isPreview }) => {
    if (mode === 'library') {
        const base = import.meta.dirname
        const { cp } = await import('node:fs/promises')

        if (isPreview) {
            // Serve the demo site to showcase the latest library build
            const demoDir = resolve(base, 'demo')
            await cp(resolve(base, 'dist'), demoDir, { recursive: true })

            return defineConfig({})
        }

        // IDEA: Use the bundled fonts instead of inlined fonts to improve performance
        // We would need to disable the inlined fonts for the vite lib build.
        // await cp(resolve(base, 'dist-svelte/fonts'), resolve(base, 'dist/fonts'), {
        //     recursive: true,
        // })

        // Copy the relevant type definitions to make sure users get proper intellisense for the public API
        await Promise.all(
            ['index', 'types', 'content'].map((file) =>
                cp(
                    resolve(import.meta.dirname, 'dist-svelte', `${file}.d.ts`),
                    resolve(
                        import.meta.dirname,
                        'dist',
                        file === 'index' ? 'framework.d.ts' : `${file}.d.ts`,
                    ),
                ),
            ),
        )

        return configs.library()
    }

    // Default to starting the SvelteKit development environment
    return configs.dev()
})

// Before: 469 kB transferred
// After in preview mode: 589 kB => 25% more. Likely caused by the inlined fonts, and the overhead of using Svelte + bits-ui, compiled into an UMD bundle.
// After in preview mode without 355 kB => 24,3% smaller. And this is despite including the inlined fonts which is really inefficient.

// IDEA: Allow fonts to be loaded from files instead of bundled as base64
// Additionally, we could detect if the fonts are already supported on the page and load them conditionally
// Or we could use two CSS imports, where the library user imports the widget CSS, and optionally fonts CSS (which loads the font files)
// This would likely reduce the build size since we don't have to load base64 fonts that are never used.
// See https://calendar.perfplanet.com/2018/performance-anti-patterns-base64-encoding/
