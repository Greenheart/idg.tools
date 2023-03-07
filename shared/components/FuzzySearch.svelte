<script lang="ts">
    import Typeahead from 'svelte-typeahead'
    import Search from '../icons/Search.svelte'
    import Link from './Link.svelte'

    export let data: any
    export let extract: (item: any) => any

    // let searchVisible = false

    // const toggleSearch = () => {
    //     searchVisible = !searchVisible
    // }
</script>

<div class="flex items-center gap-4">
    <!-- <Search class="cursor-pointer" on:click={toggleSearch} /> -->
    <!-- {#if searchVisible} -->
    <!-- TBD: remove padding of search result for full link width -->
    <Typeahead {data} {extract} limit={10} hideLabel class="fuzzysearch" let:result>
        <Link href={`/${result.original.link}`} unstyled class="flex flex-1">
            <span class="inline py-1 px-4">{@html result.string}</span>
        </Link>
    </Typeahead>
    <!-- {/if} -->
</div>

<style>
    :global([data-svelte-typeahead]) {
        z-index: 50 !important;
    }
</style>
