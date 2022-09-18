<script lang="ts">
    import { clickOutside } from '$lib/directives'
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
        : 'Select skills to practice'

    function close() {
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
</script>

<!-- TODO: Add transition when opening and closing filters so the user understands what happens -->
<details
    bind:open={$filtersExpanded}
    class="sticky top-0 z-10 flex text-stone-900 shadow-2xl"
    use:clickOutside={$filtersExpanded ? close : undefined}
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
        class={'grid gap-4 p-4 border-t border-stone-900 text-stone-900 bg-stone-900'}
    >
        <div class="flex flex-wrap gap-3">
            <Skills {content} />
        </div>
        <Button on:click={close}>Apply filters</Button>
    </div>
</details>
