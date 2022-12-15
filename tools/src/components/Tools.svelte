<script lang="ts">
    import type { ToolsContent, Tool } from '$shared/types'
    import { selectedSkills, visibleItems, selectedTags } from '$lib/stores'
    import ToolPreview from './ToolPreview.svelte'
    import Button from '$shared/components/Button.svelte'

    export let tools: Tool[]
    export let content: ToolsContent

    const showAll = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    const showMore = () => {
        // TODO: this might not be what we want -> show 10 or 20 more at a time
        $visibleItems = Math.max(tools.length, Math.min($visibleItems + 10, tools.length))
    }
</script>

{#each tools.slice(0, $visibleItems) as tool (tool.link)}
    <ToolPreview {tool} {content} />
{:else}
    <div class="flex flex-col items-center space-y-4 lg:col-span-2 text-sm">
        <p>There are no published tools matching your search yet</p>
        <Button on:click={showAll}>Show all tools</Button>
    </div>
{/each}

<div class="flex flex-col items-center justify-center space-y-4 pt-8 text-sm lg:col-span-2">
    <p>
        Showing {Math.min($visibleItems, tools.length)} of {tools.length} tools{#if $selectedSkills.length || $selectedTags.length}
            &nbsp;matching your search{/if}
    </p>
    {#if $visibleItems < tools.length}
        <Button on:click={showMore}>Show more</Button>
    {:else if tools.length && ($selectedSkills.length || $selectedTags.length)}
        <Button on:click={showAll}>Show all tools</Button>
    {/if}
</div>
