<script lang="ts">
    import FuzzySearch from '$shared/components/FuzzySearch.svelte'
    import { goto } from '$app/navigation'
    import type { Tag, Tool, ToolsContent } from '$shared/types'
    import { listenForScroll, selectedSkills, selectedTags, visibleItems } from '$lib/stores'
    import Button from '$shared/components/Button.svelte'
    import { cx } from '$shared/utils'
    import VisibleToolsCount from './VisibleToolsCount.svelte'

    const showAll = () => {
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
</script>

<div class="toolbar grid grid-cols-[max-content_1fr] gap-4 pb-3">
    <FuzzySearch data={content.tools} {extract} {goto} />

    <div class="col-span-full">
        <h3>Select tags</h3>
        <div class="bg-being/20 flex flex-wrap gap-2 p-2">
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

    <!-- {#if visibleCount < content.tools.length}
        <div class="col-span-full flex items-center gap-2">
            <span>Showing {visibleCount} of {content.tools.length} tools.</span>
            <Button on:click={showAll} unstyled size="sm" class="text-base underline"
                >Show all</Button
            >
        </div>
    {/if} -->
    <div class="col-span-full flex items-center justify-between gap-2 text-sm">
        <span class="py-1">
            <VisibleToolsCount {mostRelevantTools} allToolsCount={content.tools.length} />
        </span>
        <!-- <span class="py-1">Showing {$visibleItems} of {content.tools.length} tools.</span> -->
        {#if mostRelevantTools.length < content.tools.length}
            <Button on:click={showAll} unstyled size="sm" class="text-sm underline">Show all</Button
            >
        {/if}
    </div>

    <!-- <div class="col-span-full flex justify-end">
        <Button size="md" on:click={showAll}>Reset Filters</Button>
    </div> -->
</div>

<!-- TODO: Make filters responsive -->

<!-- IDEA: Add advanced filters below the standard filters as a separate section. Allow them to be toggled on or off -->
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
