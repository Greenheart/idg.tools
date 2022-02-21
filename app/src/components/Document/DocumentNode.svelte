<script lang="ts">
    import { Element, Text, Mark, Node, Marks } from './types'

    export let node: Node

    console.log(node)

    // IDEA: Maybe simplify compared to DocumentRender and use only one set of renderers without us needing to override them
    // This should work since we have a simple app. And by doing this, we can simplify the renderer even further
</script>

<!-- TODO: parse nodes and return correct components -->
<div class={$$props.class}>
    {#if typeof node.text === 'string'}
        <svelte:component this={} />
        <span>{node.text}</span>
    {:else}
        <!-- IDEA: use svelte:self to render nodes recursively -->
    {/if}
</div>
