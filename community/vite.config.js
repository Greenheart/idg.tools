import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [sveltekit()],
    server: {
        port: 5000,
    },
    preview: {
        port: 4000,
    },
    build: {
        outDir: 'dist',
    },
})
