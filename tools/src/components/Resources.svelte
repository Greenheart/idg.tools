<script lang="ts">
    import type { Tool } from '$shared/types'
    import Markdown from '$shared/components/Markdown.svelte'

    export let tool: Tool
    let className = ''
    export { className as class }

    let visibleResources = 5
    const allResources = tool.resources.split('\n').filter(Boolean)
    let source = allResources.slice(0, visibleResources).join('\n')

    const showAll = () => {
        visibleResources = allResources.length
        source = tool.resources
    }
</script>

<div class={className}>
    <Markdown {source} formatting="limited" class="!prose-base max-w-none" />
    {#if visibleResources < allResources.length}
        <button class="text-thinking mt-4 font-semibold underline" on:click={showAll}>
            Show {allResources.length - visibleResources ?? ''} more
        </button>
    {/if}
</div>
