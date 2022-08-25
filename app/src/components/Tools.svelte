<script lang="ts">
    import { onMount } from 'svelte'
    import type { Content, Tool as ToolType } from '$shared/types'
    import { selectedSkills, exploreVisibleItems } from '$lib/stores'
    import Tool from './Tool.svelte'
    import Button from './Button.svelte'
    import Link from './Link.svelte'

    export let tools: ToolType[]
    export let content: Content

    const resetSkills = () => {
        $selectedSkills = []
    }

    onMount(() => {
        exploreVisibleItems.useLocalStorage()
    })

    const showMore = () => {
        $exploreVisibleItems += 10
    }
</script>

<div class="grid gap-5 lg:grid-cols-2">
    {#each tools.slice(0, $exploreVisibleItems) as tool (tool.link)}
        <Tool {tool} {content} />
    {:else}
        <div class="flex flex-col items-center space-y-4">
            <p>
                Sorry! No published tools for these skills yet.
                <!-- Welcome to join
            <Link href={COMMUNITY_LINK} variant="pink">our community</Link> and co-create
            more tools! -->
            </p>
            <Button on:click={resetSkills} label="View all tools" />
        </div>
    {/each}
</div>

<div class="flex justify-center pt-16">
    {#if $exploreVisibleItems < tools.length}
        <button
            on:click={showMore}
            class="py-4 px-8 font-semibold text-[#E0A1B4] underline"
        >
            Show more
        </button>
    {:else}
        <Link
            href="https://github.com/Greenheart/idg.tools/discussions"
            variant="pink"
            class="py-4 px-8"
        >
            That's all so far - suggest new tools here!
        </Link>
    {/if}
</div>
