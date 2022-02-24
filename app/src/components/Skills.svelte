<script lang="ts">
    import { getCategory, getSkill } from '$lib/content-utils'
    import type { Content, Tool } from '$lib/types'
    import { cx } from '$lib/utils'
    import Button from './Button.svelte'

    export let tool: Tool
    export let content: Content
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-3', className)}>
    {#each tool.skills as skillId}
        {@const skill = getSkill(skillId, content)}
        {@const category = getCategory(skill.category, content)}
        <!-- TODO: replace buttons since these categories don't need to be interactive, neither clickable nor with any hover effect. -->
        <!--
            IDEA: OR maybe, we could show a modal with details about the skill when people click the skill.
            This could be a way to give more details.
            We should likely do it in a clearer way though
        -->
        <Button
            size="sm"
            style={`background-color: ${category.color}`}
            class="!rounded-lg"
            label={skill.name}
        />
    {/each}
</div>
