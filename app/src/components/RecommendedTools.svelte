<script lang="ts">
    import type { ItemId, Tool } from '$lib/idgs'
    import ToolListItem from './ToolListItem.svelte'

    export let selectedSkills: ItemId[]
    export let tools: Tool[]
</script>

<div class="grid gap-2">
    {#each tools as tool (tool.slug)}
        {#if tool.skills.some((skillId) => selectedSkills.includes(skillId))}
            <ToolListItem {tool} />
        {/if}
    {/each}
</div>
