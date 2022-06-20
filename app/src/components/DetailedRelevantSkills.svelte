<script lang="ts">
    import { getCategory, getSkill } from '$shared/content-utils'
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
            {@const category = getCategory(skill.category, content)}

            <div class="flex items-center justify-between gap-4">
                <span
                    class="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-2 py-1 text-stone-900"
                    style={`background-color: ${category.color}`}
                >
                    {skill.name}
                </span>
                <RelevancyScore {score} />
            </div>
        {/each}
    </div>

    {#if visibleSkills.length < tool.relevancy.length}
        <button
            class="mt-4 font-semibold text-[#E0A1B4] underline"
            on:click={showAll}
        >
            Show {remaining ?? ''} more
        </button>
    {/if}
</div>
