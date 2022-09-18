<script lang="ts">
    import {
        selectedSkills,
        filtersExpanded,
        isDimensionOpen,
    } from '$lib/stores'
    import { pluralize } from '$lib/utils'
    import type { Content, Dimension } from '$shared/types'
    import Button from './Button.svelte'
    import Expand from './icons/Expand.svelte'
    import Skills from './Skills.svelte'

    export let content: Content

    function resetFilters() {
        $selectedSkills = []
    }

    $: title = $selectedSkills.length
        ? `${pluralize('skill', $selectedSkills.length)} selected`
        : 'Filter tools based on skills and tags'

    function close() {
        if ($filtersExpanded) {
            $filtersExpanded = false

            // When filters are closed, automatically close any dimension section without any selected skills
            // This saves screen space the next time filters are opened.
            $isDimensionOpen = Object.entries($isDimensionOpen).reduce(
                (isSectionOpen, [dimensionId, isOpen]) => {
                    if (isOpen) {
                        const skillsInDimension = content.dimensions.find(
                            ({ id }) => id === dimensionId,
                        )!.skills
                        isSectionOpen[dimensionId] = skillsInDimension.some(
                            (skillId) => $selectedSkills.includes(skillId),
                        )
                    }
                    return isSectionOpen
                },
                {} as Record<Dimension['id'], boolean>,
            )
        }
    }
</script>

<!-- TODO: Refactor into a modal instead to make UX better on smaller screens. Still use sticky positioned filter toolbar. And add IDG colors to a border to distinguish it from the other content -->

<!-- TODO: Add transition when opening and closing filters so the user understands what happens -->
<!-- TODO: Decide if we want `use:clickOutside={close}` -->
<details
    bind:open={$filtersExpanded}
    class="sticky top-0 z-10 -ml-4 -mr-4 flex text-stone-900 shadow-2xl"
>
    <summary
        class="flex h-14 cursor-pointer select-none items-center justify-between bg-stone-50 px-4 py-2"
    >
        <div class="flex items-center space-x-4">
            <Expand open={$filtersExpanded} />
            <p>{title}</p>
        </div>
        {#if $selectedSkills.length}
            <Button on:click={resetFilters} variant="inverted" size="md"
                >Reset</Button
            >
        {/if}
    </summary>
    <div
        class="grid gap-4 border-t border-stone-900 bg-stone-900 p-4 text-stone-900"
    >
        <Skills {content} />
        <Button
            on:click={close}
            class="col-span-full max-w-xs justify-self-center"
            >Apply filters</Button
        >
    </div>
</details>
