const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        extend: {},
    },
    plugins: [require('@tailwindcss/typography')],
}

module.exports = config
