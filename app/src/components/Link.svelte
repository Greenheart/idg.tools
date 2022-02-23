<script lang="ts" context="module">
    import { onMount } from 'svelte'

    import { isExternalURL } from '$lib/utils'
</script>

<script lang="ts">
    export let href = ''
    let className: string = ''
    export { className as class }

    let additionalProps: object
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = { rel: 'noopener noreferrer', target: '_blank' }
        } else {
            additionalProps = { 'sveltekit:prefetch': true }
        }
    })
</script>

<a {href} class={className} {...additionalProps}>
    <slot />
</a>
