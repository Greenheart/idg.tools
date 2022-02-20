<script lang="ts">
    import DocumentNode from './DocumentNode.svelte'

    // IDEA: Maybe refactor document related stuff into a larger

    // TODO: Add proper typing for the input data
    export let document: string[]

    console.log(document)
</script>

<div class={$$props.class}>
    {#each document as x, i (i)}
        <DocumentNode node={x} />
    {/each}
</div>
