<script lang="ts">
    import type { Content, Tool as ToolType } from '$lib/types'
    import Tool from '$components/Tool.svelte'

    export let tools: ToolType[]
    export let content: Content
</script>

{#each tools as tool (tool.slug)}
    <Tool {tool} {content} />
{/each}
