<script lang="ts">
    import Typeahead from 'svelte-typeahead'
    import Search from '../icons/Search.svelte'

    interface Props {
        data: any
        extract: (item: any) => any
        goto: (url: string) => Promise<void>
        preloadData: (href: string) => Promise<any>
    }

    let { data, extract, goto, preloadData }: Props = $props()

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
        class="!h-full max-w-[240px] !border-0 !bg-white !pl-10 !pr-4 shadow-md !outline-offset-0 sm:max-w-[300px]"
        inputAfterSelect="clear"
        on:select={async ({ detail }) => {
            // Preload data to ensure the navigation can happen smoothly.
            // IDEA: Maybe trigger preload already when selecting an option from the dropdown to improve perceived performance
            await preloadData(detail.original.link)
            await goto(detail.original.link)
        }}
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
