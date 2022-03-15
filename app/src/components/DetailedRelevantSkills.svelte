<script lang="ts">
    import { getCategory, getSkill } from '$lib/content-utils'
    import type { Content, Tool } from '$lib/types'
    import Heading from './Heading.svelte'
    import RelevancyScore from './RelevancyScore.svelte'

    export let tool: Tool
    export let content: Content
    let className = ''
    export { className as class }

    const TEMP_ALL_SKILLS = content.skills
        .map((s) => ({
            relevancy: (s.name.length % 5) + 1,
            id: s.id,
            name: s.name,
            motivation:
                'This is relevant because lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam recusandae eos iure quos hic non.',
        }))
        .sort((a, b) => b.relevancy - a.relevancy)

    let [mostRelevant, remaining] = [
        TEMP_ALL_SKILLS.slice(0, 5),
        TEMP_ALL_SKILLS.slice(5),
    ]

    let visibleSkills: typeof TEMP_ALL_SKILLS = mostRelevant

    function showAll() {
        visibleSkills = TEMP_ALL_SKILLS
    }

    function showMotivation(
        motivation: typeof TEMP_ALL_SKILLS[number]['motivation'],
    ) {
        if (motivation) {
            // TODO: show modal with motivation
            // TODO: clicking outside, or pressing ESC should close it.
        }
    }
</script>

<div class={className}>
    <Heading>Relevant skills</Heading>
    <p class="pt-2 pb-4">Tap a skill to read why we think it's relevant.</p>
    <div class="grid grid-cols-1 gap-3">
        {#each visibleSkills as { id, motivation, relevancy }}
            {@const skill = getSkill(id, content)}
            {@const category = getCategory(skill.category, content)}
            <!--
                IDEA: OR maybe, we could show a modal with details about the skill when people click the skill.
                This could be a way to give more details.
                We should likely do it in a clearer way though
            -->
            <div
                on:click={() => showMotivation(motivation)}
                class="flex items-center justify-between gap-4"
            >
                <span
                    class="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg px-2 py-1 font-semibold text-stone-900"
                    style={`background-color: ${category.color}`}
                >
                    {skill.name}
                </span>
                <RelevancyScore {relevancy} />
            </div>
        {/each}
    </div>

    {#if visibleSkills.length < TEMP_ALL_SKILLS.length}
        <button
            class="mt-4 font-semibold text-[#E0A1B4] underline"
            on:click={showAll}
        >
            Show {remaining.length ?? ''} more
        </button>
    {/if}
</div>
