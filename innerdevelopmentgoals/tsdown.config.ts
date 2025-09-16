import { defineConfig } from 'tsdown'
import svelte from 'rollup-plugin-svelte'

// TODO: Create UMD bundle that can be loaded as a browser global
// Or look at how the emoji picker solved the bundling

// TODO: Move all shared types and code into the component during bundling

// Might be useful: https://medium.com/geekculture/how-to-publish-a-js-and-css-library-to-npm-using-rollup-5406dbee51fa

// Old example of how to bundle output multiple files using Rollup:
// https://github.com/lokimckay-references/svelte-web-component-library-example/blob/master/package.json

export default defineConfig({
    entry: ['./src/lib/index.ts'],
    platform: 'browser',
    dts: {
        oxc: true,
    },
    plugins: [svelte()],
    // TODO: Set a good target for the browser bundle, for example es2022 or es2021 for maximum compatibility
})

// TODO: minify JS for CDN bundle
// TODO: minify CSS for CDN bundle

// An alternative might be to replace sveltekit with the built-in library mode in Vite: https://vite.dev/guide/build.html#library-mode
// This could simplify the project setup. However, since we likely want to support SvelteKit SSR for the components, it makes sense to stick with SvelteKit for now.
