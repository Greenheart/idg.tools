<script lang="ts" context="module">
    import { onMount } from 'svelte'

    import { isExternalURL, cx } from '../utils'
    import { variants, defaultVariant, defaultClasses, sizes, defaultSize } from './Button.svelte'
    import Link from './Link.svelte'
</script>

<script lang="ts">
    export let variant: keyof typeof variants = defaultVariant
    export let size: keyof typeof sizes = defaultSize
    export let disabled: boolean = false
    let className = ''
    export { className as class }

    export let href = ''
    let additionalProps: object = {}
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = {
                rel: 'noopener noreferrer',
                target: '_blank',
                'data-sveltekit-reload': true,
            }
        }
    })
</script>

<Link
    {href}
    unstyled
    class={cx(
        defaultClasses,
        variants[disabled ? 'disabled' : variant],
        disabled ? 'pointer-events-none' : '',
        sizes[size],
        className,
    )}
    {...additionalProps}
>
    <slot />
</Link>
