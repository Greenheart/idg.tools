<script lang="ts">
    // Simplified renderer based on https://github.com/keystonejs/keystone/blob/main/packages/document-renderer/src/index.tsx
    import DocumentNode from './DocumentNode.svelte'
    import type { Element } from './types'

    export let document: Element[]

    console.log(document)
</script>

<div class={$$props.class}>
    {#each document as x, i (i)}
        <DocumentNode node={x} />
    {/each}
</div>
