<script lang="ts">
    import {
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
    } from '@rgossiaux/svelte-headlessui'

    import {
        selectedSkills,
        filtersExpanded,
        isDimensionOpen,
    } from '$lib/stores'
    // TODO: If we don't need `filtersExpanded` outside of this component, we could use local state instead and remove a store

    import type { Content, Dimension } from '$shared/types'
    import Button from './Button.svelte'
    import Skills from './Skills.svelte'
    import FiltersToolbar from './FiltersToolbar.svelte'
    import { pluralize } from '$lib/utils'

    export let content: Content

    $: title = $selectedSkills.length
        ? `${pluralize('skill', $selectedSkills.length)} selected`
        : 'Filter tools based on skills and tags'

    // $: document.documentElement.classList.toggle(
    //     '!overflow-hidden',
    //     $filtersExpanded,
    // )

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

    let apply: any
</script>

<!-- TODO: Refactor into a modal instead to make UX better on smaller screens. Still use sticky positioned filter toolbar. And add IDG colors to a border to distinguish it from the other content -->

<!-- IDEA: Only show the background image, hide all content when opening the filters -->
<Dialog
    open={$filtersExpanded}
    on:close={close}
    class="fixed inset-0 z-20 grid justify-items-center overflow-y-auto"
    initialFocus={apply}
>
    <DialogOverlay class="fixed inset-0 -z-10 h-full w-full bg-stone-900" />

    <div class="w-full max-w-2xl sm:max-w-6xl">
        <div class="sr-only">
            <DialogTitle>Select filters</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
        </div>

        <FiltersToolbar {title} />

        <div class="mx-auto grid max-w-3xl gap-4 py-4">
            <Skills {content} />
            <Button
                bind:this={apply}
                on:click={close}
                class="col-span-full mt-4 max-w-xs justify-self-center"
                >Apply filters</Button
            >
        </div>
    </div>
</Dialog>

<FiltersToolbar {title} class={$filtersExpanded ? 'hidden' : '-mr-4 -ml-4'} />

<!-- TODO: Add transition when opening and closing filters so the user understands what happens -->
<!-- <details
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
</details> -->
