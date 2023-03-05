<script lang="ts" context="module">
    import { onMount } from 'svelte'

    import { cx, isExternalURL } from '../utils'

    export const variants = {
        orange: 'text-collaborating',
        white: 'text-white',
        black: 'text-black',
    }

    const defaultVariant = 'white'
    const defaultClasses = 'underline font-semibold'
</script>

<script lang="ts">
    export let href = ''
    let className = ''
    export { className as class }
    export let variant: keyof typeof variants = defaultVariant
    export let unstyled = false
    export let tabindex: number | undefined = undefined
    export let title: string | undefined = undefined

    let additionalProps: object
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = {
                rel: 'noopener noreferrer',
                target: '_blank',
                'data-sveltekit-prefetch': 'off',
            }
        }
    })

    const classes = unstyled ? className : cx(defaultClasses, variants[variant], className)
</script>

<a {href} {tabindex} {title} class={classes} {...additionalProps}>
    <slot />
</a>
