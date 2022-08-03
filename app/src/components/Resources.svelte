<script lang="ts">
    import type { Tool } from '$shared/types'
    import Markdown from '$components/Markdown.svelte'

    export let tool: Tool
    let className = ''
    export { className as class }

    let visibleResources = 5
    const allResources = tool.resources.split('\n').filter(Boolean)

    const showAll = () => {
        visibleResources = allResources.length
    }
</script>

<div class={className}>
    {#if visibleResources < allResources.length}
        <Markdown source={allResources.slice(0, visibleResources).join('\n')} />
        <button
            class="mt-4 font-semibold text-[#E0A1B4] underline"
            on:click={showAll}
        >
            Show {allResources.length - visibleResources ?? ''} more
        </button>
    {:else}
        <Markdown source={tool.resources} />
    {/if}
</div>
