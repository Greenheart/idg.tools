<script lang="ts">
    import Typeahead from 'svelte-typeahead'
    import Search from '../icons/Search.svelte'

    export let data: any
    export let extract: (item: any) => any
    export let goto: (url: string) => Promise<void>
</script>

<div class="flex items-center gap-4">
    <Search class="cursor-pointer" />
    <Typeahead
        {data}
        {extract}
        limit={10}
        label="Search tools"
        hideLabel
        class="!px-4"
        inputAfterSelect="clear"
        on:select={({ detail }) => goto(detail.original.link)}
    />
</div>

<style>
    :global([data-svelte-typeahead]) {
        z-index: 50 !important;
    }
</style>
