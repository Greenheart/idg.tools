const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    safelist: ['being', 'thinking', 'relating', 'collaborating', 'acting'].map(
        (name) => `bg-${name}`,
    ),
    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                being: '#D9C7A7',
                thinking: '#E0A1B4',
                relating: '#DE7268',
                collaborating: '#F18E61',
                acting: '#9E7983',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}

module.exports = config
