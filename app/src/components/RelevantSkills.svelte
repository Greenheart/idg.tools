<script lang="ts">
    import { getSkill } from '$shared/content-utils'
    import type { Content, Tool } from '$shared/types'
    import { cx, getColor } from '$lib/utils'

    export let tool: Tool
    export let visible: number
    export let content: Content
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-2 pr-[29px]', className)}>
    {#each tool.relevancy.slice(0, visible) as relevancy}
        {@const skill = getSkill(relevancy.skill, content)}
        {@const color = getColor(relevancy.skill)}
        <!--
            IDEA: OR maybe, we could show a modal with details about the skill when people click the skill.
            This could be a way to give more details.
            We should likely do it in a clearer way though
        -->
        <span class={cx('rounded-lg px-2 py-1 text-stone-900', color)}>
            {skill.name}
        </span>
    {/each}
</div>
