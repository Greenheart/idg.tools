<script lang="ts">
    import { cx, getColor } from '$lib/utils'
    import { getSkill } from '$shared/content-utils'
    import type { IDGRelevancy, Skill } from '$shared/types'
    import RelevancyScore from './RelevancyScore.svelte'

    export let skills: Skill[]
    export let relevancy: IDGRelevancy[]
    let className = ''
    export { className as class }

    let [mostRelevant, remaining] = [relevancy.slice(0, 5), relevancy.slice(5).length]

    let visibleSkills = mostRelevant
    function showAll() {
        visibleSkills = relevancy
    }
</script>

<div class={className}>
    <div class="grid grid-cols-1 gap-2 text-sm text-white">
        {#each visibleSkills as { skill: skillId, score }}
            {@const skill = getSkill(skillId, { skills })}
            {@const color = getColor(skillId)}

            <div class="flex items-center justify-between gap-4">
                <span
                    class={cx(
                        'overflow-hidden text-ellipsis whitespace-nowrap px-2 py-1 font-semibold',
                        color,
                    )}
                >
                    {skill.name}
                </span>
                <RelevancyScore {score} />
            </div>
        {/each}
    </div>

    {#if visibleSkills.length < relevancy.length}
        <button class="text-thinking mt-4 font-semibold underline" on:click={showAll}>
            Show {remaining ?? ''} more
        </button>
    {/if}
</div>
