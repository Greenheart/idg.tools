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

    import type { Content, Dimension } from '$shared/types'
    import Button from './Button.svelte'
    import Skills from './Skills.svelte'
    import FiltersToolbar from './FiltersToolbar.svelte'
    import { pluralize } from '$lib/utils'

    export let content: Content

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

    let applyButton: HTMLButtonElement
</script>

<Dialog
    open={$filtersExpanded}
    on:close={close}
    class="fixed inset-0 z-20 grid justify-items-center overflow-y-auto"
    unmount={false}
    initialFocus={applyButton}
>
    <div
        class="fixed inset-0 -z-20 bg-stone-900 bg-[url(/images/david-marcu-78A265wPiO4-unsplash.jpg)] bg-cover bg-fixed bg-center bg-no-repeat"
    />
    <DialogOverlay class="filters-backdrop fixed inset-0 -z-10" />

    <div class="w-full max-w-2xl sm:max-w-6xl">
        <div class="sr-only">
            <DialogTitle>Select filters</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
        </div>

        <FiltersToolbar {title} />

        <div class="mx-auto grid max-w-3xl gap-4 py-4">
            <Skills {content} />
            <Button
                bind:element={applyButton}
                on:click={close}
                class="col-span-full mt-4 max-w-xs justify-self-center"
                >Apply filters</Button
            >
        </div>
    </div>
</Dialog>

<FiltersToolbar
    {title}
    class={$filtersExpanded ? 'invisible' : '-mr-4 -ml-4'}
/>
