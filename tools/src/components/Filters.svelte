<script lang="ts">
    import {
        Dialog,
        DialogOverlay,
        DialogTitle,
        DialogDescription,
    } from '@rgossiaux/svelte-headlessui'

    import { selectedSkills, filtersExpanded, isDimensionOpen, selectedTags } from '$lib/stores'

    import type { ToolsContent, Dimension } from '$shared/types'
    import Button from '$shared/components/Button.svelte'
    import Skills from './Skills.svelte'
    import FiltersToolbar from './FiltersToolbar.svelte'
    import { onKeydown, pluralize } from '$lib/utils'
    import Heading from '$shared/components/Heading.svelte'
    import Tags from './Tags.svelte'

    export let content: ToolsContent

    $: title =
        $selectedSkills.length || $selectedTags.length
            ? `${$selectedSkills.length ? pluralize('skill', $selectedSkills.length) : ''}${
                  $selectedSkills.length ? ($selectedTags.length ? ' and ' : '') : ''
              }${$selectedTags.length ? pluralize('tag', $selectedTags.length) : ''} selected`
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
                        isSectionOpen[dimensionId] = skillsInDimension.some((skillId) =>
                            $selectedSkills.includes(skillId),
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
    class="fixed inset-0 z-40 grid justify-items-center overflow-y-auto lg:pr-[15px]"
    unmount={false}
    initialFocus={applyButton}
>
    <div class="fixed inset-0 -z-20 bg-black" />
    <DialogOverlay class="filters-backdrop fixed inset-0 -z-10" />

    <div class="w-full max-w-2xl sm:max-w-6xl">
        <div class="sr-only">
            <DialogTitle>Content preferences</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
        </div>

        <FiltersToolbar {title} />

        <div class="mx-auto grid max-w-3xl gap-4 p-4 text-stone-50">
            <Heading>Select skills</Heading>
            <Skills {content} class="-ml-4 -mr-4 sm:-ml-8 sm:-mr-8" />

            <Heading class="mt-4">Content preferences</Heading>
            <Tags tags={content.tags} inverted interactive size="lg" />
            <Button
                bind:element={applyButton}
                on:click={close}
                on:keydown={onKeydown(close)}
                class="col-span-full my-4 max-w-xs justify-self-center">Show content</Button
            >
        </div>
    </div>
</Dialog>

<!-- IDEA: allow peple to filter tools based on dimension, and sort by the most relevant in each dimension -->

<!-- TODO: display a button for each dimension, that when clicked selects all skills within that category -->
<!-- TODO: Show a instruction explaining how it works, and where to learn more about the IDG framework -->
<!-- TODO: Add button to open advanced filters, which opens the fullscreen Filters dialog -->
<!-- IDEA: maybe use a `Set` instead of an `Array` to store the selectedSkills state. This migh help when selecting all skills in a specific dimension -->
<!-- IDEA: possibly update the and/or logic of skills and tags in the filters and getMostRelevantTools() -->
<FiltersToolbar {title} class={$filtersExpanded ? 'invisible' : ''} />
