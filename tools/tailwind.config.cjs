const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
    // Special setup here to include the tailwind classes from the component library when building.
    content: ['./src/**/*.{html,js,svelte,ts}', '../shared/**/*.{html,js,svelte,ts}'],
    safelist: ['being', 'thinking', 'relating', 'collaborating', 'acting'].flatMap((name) => [
        `bg-${name}`,
        `text-${name}`,
        `group-hover:!text-${name}`,
        `hover:outline-${name}`,
        `outline-${name}`,
    ]),
    theme: {
        screens: {
            // IDEA: Might be useful in some cases to have another breakpoint
            // '2xs': '375px',
            xs: '475px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
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
    },
    plugins: [require('@tailwindcss/typography')],
}

module.exports = config
