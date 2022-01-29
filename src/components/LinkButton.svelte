<script lang="ts" context="module">
    import { onMount } from 'svelte'

    import { isExternalURL, cx } from '$lib/utils'
    import {
        variants,
        defaultVariant,
        defaultButtonClasses,
    } from './Button.svelte'
    import Link from './Link.svelte'
</script>

<script lang="ts">
    export let variant: keyof typeof variants = defaultVariant

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
    class={cx(
        defaultButtonClasses,
        variants[variant ?? defaultVariant],
        $$props.class ?? '',
    )}
    {...additionalProps}
>
    <slot />
</Link>
