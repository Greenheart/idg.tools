import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

const { NODE_ENV } = process.env

export default {
    plugins: [
        //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
        tailwindcss(),
        //But others, like autoprefixer, need to run after,
        autoprefixer(),
        NODE_ENV !== 'development' && cssnano({ preset: 'default' }),
    ],
}
