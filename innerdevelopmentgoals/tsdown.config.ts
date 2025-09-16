import { defineConfig } from 'tsdown'
import svelte from 'rollup-plugin-svelte'

// TODO: Create UMD bundle that can be loaded as a browser global
// Or look at how the emoji picker solved the bundling
// TODO: Include compiled CSS in build
// TODO: Consider if tailwind should be used or not since it might interfere with classes that are already on the page
// Maybe we could compile tailwind into regular CSS classes to combine all utilities into specific class selectors instead?

// TODO: Move all shared types and code into the component during bundling

// To bundle fonts, we could do like this: https://stackoverflow.com/questions/73868885/react-component-library-how-to-correctly-bundle-fonts-with-rollup
// Or in tsdown, we could just copy the relevant files instead and replace the fontsource imports with references to the actual bundled font files.
// We just need to make sure the fonts can be loaded from the npm package though.
// Alternatively, the code sample should include loading the fonts too - or the main script could add the CSS imports for fonts manually
// Might be useful: https://medium.com/geekculture/how-to-publish-a-js-and-css-library-to-npm-using-rollup-5406dbee51fa

// Old example of how to bundle output multiple files using Rollup:
// https://github.com/lokimckay-references/svelte-web-component-library-example/blob/master/package.json

// TODO: Prepare locales for build.
//
// 1) Either add JSON files to the build (all.json) as well as locale-specific files.
// This would let the library user define which locales they want (e.g. ['en', 'de']), with the default being to load 'all.json'.
// This would rely on relative path imports to fetch the relevant JSON files. This would increase the load time though.
//
// 2) Another option is to build the content as ES modules with one for each locale, and an `all.js` file that includes all locales.
// These files could be created in the content build process.
// One benefit of using ES modules is that the locales will get loaded together with the widget, rather than waiting for the client to do a network round-trip.
// This way, the JS bundle is larger, but the perceived performance will likely be faster, especially for users with slow networks.
// This would allow tree-shaking for more advanced setups, to only include the locales you want.
//
// 3) Only build content as one ES module, and leave the locale customisation for later.

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
