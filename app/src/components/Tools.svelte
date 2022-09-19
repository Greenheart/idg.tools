<script lang="ts">
    import type { Content, Tool } from '$shared/types'
    import { selectedSkills, visibleItems, selectedTags } from '$lib/stores'
    import ToolPreview from './ToolPreview.svelte'
    import Button from './Button.svelte'
    import Link from './Link.svelte'
    import { SUGGEST_NEW_TOOL_LINK } from '$lib/constants'

    export let tools: Tool[]
    export let content: Content

    const showAll = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    const showMore = () => {
        $visibleItems += 10
    }
</script>

{#each tools.slice(0, $visibleItems) as tool (tool.link)}
    <ToolPreview {tool} {content} />
{:else}
    <div class="flex flex-col items-center space-y-4 lg:col-span-2">
        <p>No published tools matching your filters yet.</p>
        <Button on:click={showAll}>Show all tools</Button>
        <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest new tools here</Link
            >!
        </p>
    </div>
{/each}

<div
    class="flex flex-col items-center justify-center space-y-4 pt-8 lg:col-span-2"
>
    {#if $visibleItems < tools.length}
        <Button on:click={showMore}>Show more</Button>
    {:else if tools.length}
        {#if $selectedSkills.length || $selectedTags.length}
            <p>These are all tools matching your search so far.</p>
            <Button on:click={showAll}>Show all tools</Button>
        {:else}
            <p>These are all published tools so far.</p>
        {/if}
        <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest new tools here</Link
            >!
        </p>
    {/if}
</div>
