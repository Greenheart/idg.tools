import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { setDefaultResultOrder } from 'dns'

setDefaultResultOrder('verbatim')

export default defineConfig({
    plugins: [sveltekit()],
})
