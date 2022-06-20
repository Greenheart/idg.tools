<script lang="ts">
    import type { Content, Tool as ToolType } from '$shared/types'
    import { selectedSkills } from '$lib/stores'
    import Tool from './Tool.svelte'
    import Button from './Button.svelte'
    import Link from './Link.svelte'

    export let tools: ToolType[]
    export let content: Content

    const resetSkills = () => {
        $selectedSkills = []
    }

    let limit = 3

    const showMore = () => {
        limit += 3
    }
</script>

{#each tools.slice(0, limit) as tool (tool.link)}
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

<div class="flex justify-center">
    {#if limit < tools.length}
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
