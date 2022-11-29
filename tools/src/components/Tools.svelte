<script lang="ts">
    import type { ToolsContent, Tool } from '$shared/types'
    import { selectedSkills, visibleItems, selectedTags } from '$lib/stores'
    import ToolPreview from './ToolPreview.svelte'
    import Button from '$shared/components/Button.svelte'
    import Link from '$shared/components/Link.svelte'
    import { SUGGEST_NEW_TOOL_LINK } from '$lib/constants'

    export let tools: Tool[]
    export let content: ToolsContent

    const showAll = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    const showMore = () => {
        $visibleItems = Math.max(tools.length, Math.min($visibleItems + 10, tools.length))
    }
</script>

{#each tools.slice(0, $visibleItems) as tool (tool.link)}
    <ToolPreview {tool} {content} />
{:else}
    <div class="flex flex-col items-center space-y-4 lg:col-span-2">
        <p>There are no published tools matching your search yet.</p>
        <Button on:click={showAll}>Show all tools</Button>
        <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest a new tool here</Link
            >!
        </p>
    </div>
{/each}

<div class="flex flex-col items-center justify-center space-y-4 pt-8 lg:col-span-2">
    <!-- TODO: Fix formatting bug to make sure this makes sense -->
    <!-- <div class="text-sm">
        Showing {$visibleItems} of {tools.length} tools.
    </div> -->
    {#if $visibleItems < tools.length}
        <Button on:click={showMore}>Show more</Button>
    {:else if tools.length}
        {#if $selectedSkills.length || $selectedTags.length}
            <p>These are all tools matching your search so far.</p>
            <Button on:click={showAll}>Show all tools</Button>
        {/if}
        <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest a new tool here</Link
            >!
        </p>
    {/if}
</div>
