<script lang="ts">
    import Typeahead from 'svelte-typeahead'
    import Search from '../icons/Search.svelte'

    export let data: any
    export let extract: (item: any) => any
    export let goto: (url: string) => Promise<void>
</script>

<div class="grid grid-cols-[max-content_1fr]">
    <button
        class="px-2"
        on:click={() => {
            document.querySelector('#fuzzysearch')?.focus()
        }}
    >
        <Search />
    </button>
    <Typeahead
        {data}
        {extract}
        limit={10}
        label="Search tools"
        hideLabel
        class="!border-0 !px-4 shadow-md !outline-offset-0"
        inputAfterSelect="clear"
        id="fuzzysearch"
        on:select={({ detail }) => goto(detail.original.link)}
    />
</div>

<style>
    :global([data-svelte-typeahead]) {
        z-index: 50 !important;
    }
</style>
