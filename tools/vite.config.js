import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'
import { extractorSvelte, presetWind, presetTypography } from 'unocss'
import { theme } from 'unocss/preset-mini'
import UnoCSS from 'unocss/vite'
import { setDefaultResultOrder } from 'dns'

setDefaultResultOrder('verbatim')

export default defineConfig({
    plugins: [
        UnoCSS({
            presets: [presetWind(), presetTypography()],
            extractors: [extractorSvelte],
            safelist: ['being', 'thinking', 'relating', 'collaborating', 'acting'].flatMap(
                (name) => [`bg-${name}`, `text-${name}`],
            ),
            theme: {
                fontFamily: {
                    sans: ['Inter var', ...theme.fontFamily.sans],
                },
                // Original IDG colors
                colors: {
                    being: '#d4b88c',
                    thinking: '#e585a1',
                    relating: '#e84139',
                    collaborating: '#ff6821',
                    acting: '#661a30',
                    lightGray: '#f5f5f5',
                },
            },
            // theme: {
            //     breakpoints: {
            //         // IDEA: Might be useful in some cases to have another breakpoint
            //         // '2xs': '375px',
            //         xs: '475px',
            //         TODO: And add default breakpoints
            //     },
            // },
        }),
        sveltekit(),
    ],
})
