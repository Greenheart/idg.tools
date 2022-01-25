import preprocess from "svelte-preprocess"
import { resolve } from "path"
import adapter from "@sveltejs/adapter-static"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [preprocess({ postcss: true })],
    kit: {
        adapter: adapter(),
        vite: {
            resolve: {
                alias: {
                    $components: resolve("src/components"),
                    $lib: resolve("src/lib"),
                },
            },
        },
        target: "#svelte",
    },
}

export default config
