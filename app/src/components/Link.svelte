<script lang="ts" context="module">
    import { onMount } from 'svelte'

    import { cx, isExternalURL } from '$lib/utils'

    export const variants = {
        pink: 'text-[#E0A1B4]',
        white: 'text-[stone-50]',
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

    let additionalProps: object
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = { rel: 'noopener noreferrer', target: '_blank' }
        } else {
            additionalProps = { 'sveltekit:prefetch': true }
        }
    })
</script>

<a
    {href}
    class={cx(unstyled ? '' : defaultClasses, variants[variant], className)}
    {...additionalProps}
>
    <slot />
</a>
