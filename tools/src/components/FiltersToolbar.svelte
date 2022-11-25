<script lang="ts">
    import Expand from '$shared/icons/Expand.svelte'
    import { filtersExpanded, selectedSkills, selectedTags } from '$lib/stores'
    import Button from '$shared/components/Button.svelte'
    import { cx, onKeydown } from '$lib/utils'

    function resetFilters() {
        $selectedSkills = []
        $selectedTags = []
    }

    const onClick = (action: () => void) => (event: MouseEvent) => {
        event.stopPropagation()
        action()
    }

    export let title: string
    let className = ''
    export { className as class }

    const toggleOpen = () => {
        $filtersExpanded = !$filtersExpanded
    }
</script>

<button
    class={cx('sticky top-0 z-10 text-stone-900 shadow-2xl w-full', className)}
    on:click={onClick(toggleOpen)}
    on:keydown={onKeydown(toggleOpen)}
>
    <div
        class={cx(
            'relative flex h-16 cursor-pointer select-none items-center justify-between bg-stone-50 px-2 pt-2 pb-4 md:px-4',
            $filtersExpanded ? '' : '-ml-4 -mr-4',
        )}
    >
        <div class="flex items-center space-x-2 md:space-x-3">
            <Expand open={$filtersExpanded} />
            <p class="xs:text-sm text-xs md:text-base">{title}</p>
        </div>
        {#if $selectedSkills.length || $selectedTags.length}
            <Button
                on:click={onClick(resetFilters)}
                on:keydown={onKeydown(resetFilters)}
                variant="inverted"
                size="md"
                class="text-xs"
                tabindex="10">Clear filters</Button
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
</button>
