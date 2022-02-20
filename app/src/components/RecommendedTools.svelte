<script lang="ts">
    import type { Content, Skill } from '$lib/types'
    import ToolListItem from './ToolListItem.svelte'

    export let selectedSkills: Skill['id'][]
    export let content: Content
</script>

<div class="grid gap-2">
    {#each content.tools as tool (tool.slug)}
        {#if tool.skills.some((skillId) => selectedSkills.includes(skillId))}
            <ToolListItem {tool} {content} />
        {/if}
    {/each}
</div>
