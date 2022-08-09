const defaultTheme = require('tailwindcss/defaultTheme')

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        screens: {
            xs: '475px',
            ...defaultTheme.screens,
        },
        extend: {
            fontFamily: {
                sans: ['Inter var', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    plugins: [require('@tailwindcss/typography')],
}

module.exports = config
