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
        selectedTags,
    } from '$lib/stores'

    import type { ToolsContent, Dimension } from '$shared/types'
    import Button from './Button.svelte'
    import Skills from './Skills.svelte'
    import FiltersToolbar from './FiltersToolbar.svelte'
    import { onKeydown, pluralize } from '$lib/utils'
    import Heading from './Heading.svelte'
    import Tags from './Tags.svelte'

    export let content: ToolsContent

    $: title =
        $selectedSkills.length || $selectedTags.length
            ? `${
                  $selectedSkills.length
                      ? pluralize('skill', $selectedSkills.length)
                      : ''
              }${
                  $selectedSkills.length
                      ? $selectedTags.length
                          ? ' and '
                          : ''
                      : ''
              }${
                  $selectedTags.length
                      ? pluralize('tag', $selectedTags.length)
                      : ''
              } selected`
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
    class="fixed inset-0 z-20 grid justify-items-center overflow-y-auto lg:pr-[15px]"
    unmount={false}
    initialFocus={applyButton}
>
    <div
        class="fixed inset-0 -z-20 bg-stone-900 bg-[url(/images/david-marcu-78A265wPiO4-unsplash.jpg)] bg-cover bg-fixed bg-center bg-no-repeat"
    />
    <DialogOverlay class="filters-backdrop fixed inset-0 -z-10" />

    <div class="w-full max-w-2xl sm:max-w-6xl">
        <div class="sr-only">
            <DialogTitle>Content preferences</DialogTitle>
            <DialogDescription>{title}</DialogDescription>
        </div>

        <FiltersToolbar {title} />

        <div class="mx-auto grid max-w-3xl gap-4 p-4 text-stone-50">
            <Heading>Select skills</Heading>
            <Skills {content} class="-ml-4 -mr-4" />

            <Heading class="mt-4">Content preferences</Heading>
            <Tags
                tags={content.tags}
                inverted
                size="md"
                interactive
                class="!gap-3 pr-0"
            />
            <Button
                bind:element={applyButton}
                on:click={close}
                on:keydown={onKeydown(close)}
                class="col-span-full my-4 max-w-xs justify-self-center"
                >Show content</Button
            >
        </div>
    </div>
</Dialog>

<FiltersToolbar {title} class={$filtersExpanded ? 'invisible' : ''} />
