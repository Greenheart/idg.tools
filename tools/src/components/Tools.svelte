<script lang="ts">
    import type { ToolsContent, Tool } from '$shared/types'
    import { selectedSkills, visibleItems, selectedTags } from '$lib/stores'
    import ToolPreview from './ToolPreview.svelte'
    import Button from '$shared/components/Button.svelte'
    import VisibleToolsCount from './VisibleToolsCount.svelte'

    export let mostRelevantTools: Tool[]
    export let content: ToolsContent

    const showAll = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    const showMore = () => {
        $visibleItems = Math.max(
            mostRelevantTools.length,
            Math.min($visibleItems + 10, mostRelevantTools.length),
        )
    }
</script>

{#each mostRelevantTools.slice(0, $visibleItems) as tool (tool.link)}
    <ToolPreview {tool} {content} />
{:else}
    <div class="flex flex-col items-center space-y-4 lg:col-span-2 text-sm">
        <p>There are no published tools matching your search yet</p>
        <Button on:click={showAll}>Show all tools</Button>
    </div>
{/each}

<div class="flex flex-col items-center justify-center gap-4 space-y-4 pt-8 text-sm lg:col-span-2">
    <VisibleToolsCount {mostRelevantTools} allToolsCount={content.tools.length} />
    {#if $visibleItems < mostRelevantTools.length}
        <Button on:click={showMore}>Show more</Button>
    {:else if mostRelevantTools.length && ($selectedSkills.length || $selectedTags.length)}
        <Button on:click={showAll}>Show all tools</Button>
    {/if}
</div>
