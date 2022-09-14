<script lang="ts">
    import { cx, getColor } from '$lib/utils'

    import { getSkill } from '$shared/content-utils'
    import type { Content, Tool } from '$shared/types'
    import RelevancyScore from './RelevancyScore.svelte'
    export let tool: Tool
    export let content: Content
    let className = ''
    export { className as class }

    let [mostRelevant, remaining] = [
        tool.relevancy.slice(0, 5),
        tool.relevancy.slice(5).length,
    ]

    let visibleSkills = mostRelevant
    function showAll() {
        visibleSkills = tool.relevancy
    }
</script>

<div class={className}>
    <div class={'grid grid-cols-1 gap-3'}>
        {#each visibleSkills as { skill: skillId, score }}
            {@const skill = getSkill(skillId, content)}
            {@const color = getColor(skillId)}

            <div class="flex items-center justify-between gap-4">
                <span
                    class={cx(
                        'overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-2 py-1 text-white',
                        color,
                    )}
                >
                    {skill.name}
                </span>
                <RelevancyScore {score} />
            </div>
        {/each}
    </div>

    {#if visibleSkills.length < tool.relevancy.length}
        <button
            class="text-thinking mt-4 font-semibold underline"
            on:click={showAll}
        >
            Show {remaining ?? ''} more
        </button>
    {/if}
</div>
