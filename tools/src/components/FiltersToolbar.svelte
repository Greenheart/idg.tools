<script lang="ts">
    import { slide } from 'svelte/transition'
    import { cubicOut } from 'svelte/easing'
    import { FuzzySearch, Button } from '$shared/components'
    import { Filters } from '$shared/icons'
    import VisibleToolsCount from './VisibleToolsCount.svelte'

    import { goto, preloadData } from '$app/navigation'
    import type { Tag, Tool, ToolsContent } from '$shared/types'
    import { listenForScroll, selectedSkills, selectedTags } from '$lib/stores'
    import { cx } from '$shared/utils'

    const resetFilters = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    const toggleTag = (tagId: Tag['id']) => {
        $listenForScroll = false
        // NOTE: Instead of recreating the array all the time, this might benefit from using a JS Set
        if ($selectedTags.includes(tagId)) {
            $selectedTags = $selectedTags.filter((id) => id !== tagId)
        } else {
            $selectedTags = [...$selectedTags, tagId]
        }
        setTimeout(() => {
            $listenForScroll = true
        }, 100)
    }

    // TODO: Add support for searching tool description, actions, resources, and more
    // But always show the name of the tool, or the excerpt of the relevant text
    // IDEA: Maybe extract all relevant strings and let them be searched
    const extract = (tool: Tool) => tool.name

    export let content: ToolsContent
    export let mostRelevantTools: Tool[]

    let advancedFilters = false
</script>

<div class="toolbar grid grid-cols-2 pb-3">
    <FuzzySearch data={content.tools} {extract} {goto} {preloadData} />

    <Button
        size="sm"
        class="xs:rounded-none xs:px-4 flex items-center gap-2 justify-self-end rounded-full"
        on:click={() => {
            advancedFilters = !advancedFilters
        }}><Filters /> <span class="xs:inline hidden">Filters</span></Button
    >

    {#if advancedFilters}
        <div
            class="col-span-full pt-4"
            in:slide={{ easing: cubicOut, duration: 300 }}
            out:slide={{ easing: cubicOut, duration: 300 }}
        >
            <h3 class="pb-2 text-sm">Select tags</h3>
            <div class="bg-being/40 flex flex-wrap gap-2 p-2">
                {#each content.tags as tag}
                    <Button
                        size="sm"
                        unstyled
                        on:click={() => toggleTag(tag.id)}
                        class={cx(
                            'xs:text-base transform-gpu bg-white text-sm !font-normal duration-100',
                            !$selectedTags.includes(tag.id) &&
                                'bg-opacity-50 shadow-lg hover:bg-opacity-75',
                        )}>{tag.name}</Button
                    >
                {/each}
            </div>
        </div>
    {/if}

    <div class="col-span-full flex items-center justify-between gap-2 pt-4 text-sm">
        <span class="py-1">
            <VisibleToolsCount {mostRelevantTools} allToolsCount={content.tools.length} />
        </span>
        <Button
            on:click={resetFilters}
            unstyled
            size="sm"
            class="px-0 text-sm underline disabled:opacity-70"
            disabled={mostRelevantTools.length === content.tools.length}>Reset</Button
        >
    </div>
</div>

<style>
    .toolbar {
        border-bottom: 0.25rem solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
            to right,
            var(--being) 0%,
            var(--being) 20%,
            var(--thinking) 20%,
            var(--thinking) 40%,
            var(--relating) 40%,
            var(--relating) 60%,
            var(--collaborating) 60%,
            var(--collaborating) 80%,
            var(--acting) 80%,
            var(--acting) 100%
        );
    }
</style>
