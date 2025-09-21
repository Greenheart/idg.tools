import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { setDefaultResultOrder } from 'dns'
import { cp, mkdir } from 'fs/promises'
import { resolve } from 'path'

setDefaultResultOrder('verbatim')

export default defineConfig(async ({ command, mode }) => {
    const config = {
        plugins: [sveltekit(), tailwindcss()],
    }

    if (command === 'build' || mode === 'development') {
        // Copy over the latest framework embed assets
        const frameworkAssetsDir = resolve(import.meta.dirname, 'static/assets/widgets')
        await mkdir(frameworkAssetsDir, { recursive: true })

        await Promise.all(
            ['framework.css', 'framework.umd.cjs'].map((file) =>
                cp(
                    resolve(import.meta.dirname, 'node_modules/innerdevelopmentgoals/dist/', file),
                    resolve(frameworkAssetsDir, file),
                ),
            ),
        )
    }

    return config
})
