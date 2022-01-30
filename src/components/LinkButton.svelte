<script lang="ts" context="module">
    import { onMount } from 'svelte'

    import { isExternalURL, cx } from '$lib/utils'
    import {
        variants,
        defaultVariant,
        defaultClasses,
        sizes,
        defaultSize,
    } from './Button.svelte'
    import Link from './Link.svelte'
</script>

<script lang="ts">
    export let variant: keyof typeof variants = defaultVariant
    export let size: keyof typeof sizes = defaultSize
    export let disabled: boolean = false

    export let href = ''
    let additionalProps: object
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = { rel: 'noopener noreferrer', target: '_blank' }
        } else {
            additionalProps = { 'sveltekit:prefetch': true }
        }
    })
</script>

<Link
    {href}
    {...$$props}
    {disabled}
    class={cx(
        defaultClasses,
        variants[disabled ? 'disabled' : variant ?? defaultVariant],
        sizes[size ?? defaultSize],
        $$props.class ?? '',
    )}
    {...additionalProps}
>
    <slot />
</Link>
