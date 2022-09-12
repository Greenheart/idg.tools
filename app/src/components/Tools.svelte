<script lang="ts">
    import { onMount } from 'svelte'

    import type { Content, Tool } from '$shared/types'
    import { selectedSkills, visibleItems } from '$lib/stores'
    import ToolPreview from './ToolPreview.svelte'
    import Button from './Button.svelte'
    import Link from './Link.svelte'
    import Arrow from './icons/Arrow.svelte'
    import { SUGGEST_NEW_TOOL_LINK } from '$lib/constants'
    import TopPick from './TopPick.svelte'

    export let tools: Tool[]
    export let content: Content

    const resetSkills = () => {
        $selectedSkills = []
    }

    onMount(() => {
        visibleItems.useLocalStorage()
    })

    const showMore = () => {
        $visibleItems += 10
    }
</script>

{#each tools.slice(0, $visibleItems) as tool, index (tool.link)}
    {#if index === 0}
        <TopPick {tool} {content} />
    {:else}
        <ToolPreview {tool} {content} />
    {/if}
{:else}
    <div class="flex flex-col items-center space-y-4">
        <p>
            No published tools for these skills yet.
            <!-- Welcome to
            <Link href={GITHUB_LINK} variant="pink">suggest new tools here</Link
            >! -->
        </p>
        <Button on:click={resetSkills}>View all tools</Button>
        <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink">Suggest new tool</Link
        >
    </div>
{/each}

<div
    class="col-span-2 flex flex-col items-center justify-center space-y-4 pt-16"
>
    {#if $visibleItems < tools.length}
        <Button on:click={showMore}>Continue <Arrow /></Button>
    {:else}
        <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest new tools here</Link
            >!
        </p>
        <Button on:click={resetSkills}>View all tools</Button>
        <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink">Suggest new tool</Link
        >
    {/if}
</div>
