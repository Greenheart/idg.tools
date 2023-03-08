<script lang="ts">
    import Typeahead from 'svelte-typeahead'
    import Search from '../icons/Search.svelte'

    export let data: any
    export let extract: (item: any) => any
    export let goto: (url: string) => Promise<void>

    const label = 'Search tools...'
</script>

<div class="relative grid grid-cols-[max-content_1fr]">
    <Search class="pointer-events-none absolute left-2 !z-[9] h-full" />
    <Typeahead
        {data}
        {extract}
        limit={10}
        {label}
        placeholder={label}
        hideLabel
        class="!h-full max-w-[250px] !border-0 !bg-white !pr-4 !pl-10 shadow-md !outline-offset-0 sm:max-w-[300px]"
        inputAfterSelect="clear"
        on:select={({ detail }) => goto(detail.original.link)}
    />
</div>

<style>
    :global([data-svelte-typeahead]) {
        z-index: 8 !important;
        background: none !important;
    }

    :global([data-svelte-typeahead] ul.svelte-typeahead-list) {
        z-index: 50 !important;
        background: var(--lightGray) !important;
    }

    :global([data-svelte-search]) {
        height: 100% !important;
    }
</style>
