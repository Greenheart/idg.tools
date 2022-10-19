import { defineConfig } from 'vite'
import { setDefaultResultOrder } from 'dns'

setDefaultResultOrder('verbatim')

export default defineConfig({
    root: 'src',
    server: {
        port: 1234,
    },
    build: {
        outDir: 'build',
    },
})
