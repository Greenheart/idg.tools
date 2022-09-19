<script lang="ts">
    import { getSkill } from '$shared/content-utils'
    import type { Content, Tool } from '$shared/types'
    import { cx, getColor } from '$lib/utils'
    import { selectedSkills } from '$lib/stores'

    export let tool: Tool
    export let visible: number
    export let content: Content
    let className = ''
    export { className as class }
</script>

<div
    class={cx('flex flex-wrap items-start gap-2 pr-[29px] text-sm', className)}
>
    {#each tool.relevancy
        .filter($selectedSkills.length ? ({ skill }) => $selectedSkills.includes(skill) : () => true)
        .slice(0, visible) as relevancy}
        {@const skill = getSkill(relevancy.skill, content)}
        {@const color = getColor(relevancy.skill)}
        <!-- IDEA: show "+N more" -->
        <span class={cx('rounded-lg px-2 py-1 text-white', color)}>
            {skill.name}
        </span>
    {/each}
</div>
