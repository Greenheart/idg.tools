<script lang="ts">
    import { getSkill } from '$shared/content-utils'
    import type { ToolsContent, Tool } from '$shared/types'
    import { cx, getColor } from '$lib/utils'
    import { selectedSkills } from '$lib/stores'

    export let tool: Tool
    export let visible: number
    export let content: ToolsContent
    let className = ''
    export { className as class }

    $: mostRelevantSkills = tool.relevancy
        .filter(
            $selectedSkills.length ? ({ skill }) => $selectedSkills.includes(skill) : () => true,
        )
        .slice(0, visible)
</script>

<div class={cx('flex flex-wrap items-start gap-1 pr-[29px] text-sm', className)}>
    {#each mostRelevantSkills as relevancy}
        {@const skill = getSkill(relevancy.skill, content)}
        {@const color = getColor(relevancy.skill)}
        <span class={cx('rounded-lg px-2 py-1 text-white', color)}>
            {skill.name}
        </span>
    {/each}
    {#if mostRelevantSkills.length < tool.relevancy.length}
        <span class="self-center">+{tool.relevancy.length - mostRelevantSkills.length}</span>
    {/if}
</div>
