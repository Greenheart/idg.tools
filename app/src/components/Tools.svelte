<script lang="ts">
    import type { Content, Tool as ToolType } from '$lib/types'
    import { selectedSkills } from '$lib/stores'
    import Tool from './Tool.svelte'
    import Button from './Button.svelte'

    export let tools: ToolType[]
    export let content: Content

    const resetSkills = () => {
        $selectedSkills = []
    }
</script>

{#each tools as tool (tool.link)}
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
