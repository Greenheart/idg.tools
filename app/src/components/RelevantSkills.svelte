<script lang="ts">
    import { getCategory, getSkill } from '$shared/content-utils'
    import type { Content, Tool } from '$shared/types'
    import { cx } from '$lib/utils'

    export let tool: Tool
    export let visible: number
    export let content: Content
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-2 pr-6', className)}>
    {#each tool.relevancy.slice(0, visible) as relevancy}
        {@const skill = getSkill(relevancy.skill, content)}
        {@const category = getCategory(skill.category, content)}
        <!--
            IDEA: OR maybe, we could show a modal with details about the skill when people click the skill.
            This could be a way to give more details.
            We should likely do it in a clearer way though
        -->
        <span
            class="rounded-lg px-2 py-1 text-stone-900"
            style={`background-color: ${category.color}`}
        >
            {skill.name}
        </span>
    {/each}
</div>
