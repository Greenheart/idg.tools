<script lang="ts">
    let { children } = $props()
</script>

<svelte:head>
    <link rel="preload" href="/symbols.json" as="fetch" />
</svelte:head>

{@render children?.()}
