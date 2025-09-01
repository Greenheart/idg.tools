<script>
    /**
     * @typedef {Object} Props
     * @property {import('svelte').Snippet} [children]
     */

    /** @type {Props} */
    let { children } = $props()
</script>

<svelte:head>
    <link rel="preload" href="/symbols.json" as="fetch" />
</svelte:head>

{@render children?.()}
