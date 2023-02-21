import { defineConfig } from 'vite'
import { setDefaultResultOrder } from 'dns'
import { resolve } from 'path'

setDefaultResultOrder('verbatim')

export default defineConfig({
    root: 'src',
    server: {
        port: 1234,
    },
    preview: {
        port: 2234,
    },
    build: {
        outDir: resolve('./build'),
    },
})
