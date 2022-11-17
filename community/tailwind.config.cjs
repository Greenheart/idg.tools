const defaultTheme = require('tailwindcss/defaultTheme')

const IDG_COLORS = require('../shared/colors.json')

console.log({ IDG_COLORS })

/** @type {import('tailwindcss').Config} */
const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    safelist: [
        'being',
        'thinking',
        'relating',
        'collaborating',
        'acting',
    ].flatMap((name) => [`bg-${name}`, `text-${name}`]),
    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
            // Our adapted colors
            // colors: {
            //     being: '#D9C7A7',
            //     thinking: '#E0A1B4',
            //     relating: '#DE7268',
            //     collaborating: '#F18E61',
            //     acting: '#9E7983',
            // },
            // Original IDG colors
            colors: {
                being: '#d4b88c',
                thinking: '#e585a1',
                relating: '#e84139',
                collaborating: '#ff6821',
                acting: '#661a30',
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}

module.exports = config
