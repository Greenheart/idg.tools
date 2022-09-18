<script lang="ts">
    import Expand from './icons/Expand.svelte'
    import { filtersExpanded, selectedSkills } from '$lib/stores'
    import Button from './Button.svelte'
    import { cx } from '$lib/utils'

    function resetFilters() {
        $selectedSkills = []
    }

    export let title: string
    let className = ''
    export { className as class }
</script>

<div
    class={cx('sticky top-0 z-10 text-stone-900 shadow-2xl', className)}
    on:click={() => {
        $filtersExpanded = !$filtersExpanded
    }}
>
    <div
        class="relative flex h-16 cursor-pointer select-none items-center justify-between bg-stone-50 px-2 pt-2 pb-4 md:px-4"
    >
        <div class="flex items-center space-x-3">
            <Expand open={$filtersExpanded} />
            <p>{title}</p>
        </div>
        {#if $selectedSkills.length}
            <Button
                on:click={resetFilters}
                variant="inverted"
                size="md"
                tabindex="10">Reset</Button
            >
        {/if}
        <div class="absolute left-0 bottom-0 right-0 grid h-2 grid-cols-5">
            <div class="bg-being" />
            <div class="bg-thinking" />
            <div class="bg-relating" />
            <div class="bg-collaborating" />
            <div class="bg-acting" />
        </div>
    </div>
</div>
