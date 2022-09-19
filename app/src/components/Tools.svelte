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
    <div class="flex flex-col items-center space-y-4 pt-16 lg:col-span-2">
        <p>
            No published tools for these skills yet. Welcome to
            <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest new tools here</Link
            >!
        </p>
        <Button on:click={showAll}>Show all tools</Button>
    </div>
{/each}

<div
    class="flex flex-col items-center justify-center space-y-4 pt-16 lg:col-span-2"
>
    {#if $visibleItems < tools.length}
        <Button on:click={showMore}>Show more</Button>
    {:else if tools.length}
        <p>That's everything matching your search right now.</p>
        {#if $selectedSkills.length || $selectedTags.length}
            <Button on:click={showAll}>Show all tools</Button>
        {/if}
        <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest new tools here</Link
            >!
        </p>
    {/if}
</div>
