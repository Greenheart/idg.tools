<script lang="ts">
    import type { Content, Skill } from '$lib/types'
    import Tool from './Tool.svelte'

    export let selectedSkills: Skill['id'][]
    export let content: Content
</script>

{#each content.tools as tool (tool.slug)}
    {#if tool.skills.some((skillId) => selectedSkills.includes(skillId))}
        <Tool {tool} {content} />
    {/if}
{/each}
