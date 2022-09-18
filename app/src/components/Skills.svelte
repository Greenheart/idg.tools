<script lang="ts">
    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor } from '$lib/utils'
    import type { Content, Dimension } from '$shared/types'
    import { isDimensionOpen } from '$lib/stores'

    import NumberOfSelectedSkills from './NumberOfSelectedSkills.svelte'
    import SkillButton from './SkillButton.svelte'
    import Expand from './icons/Expand.svelte'

    export let content: Content

    const onToggle = (
        event: Event & {
            currentTarget: EventTarget & HTMLElement
        },
        dimensionId: Dimension['id'],
    ) => {
        $isDimensionOpen = {
            ...$isDimensionOpen,
            [dimensionId]: (
                event?.target as unknown as EventTarget & HTMLDetailsElement
            ).open,
        }
    }

    let className = ''
    export { className as class }
</script>

<div class={cx('space-y-4', className)}>
    {#each content.dimensions as { name, description, id: dimensionId, skills: skillsInDimension }}
        {@const color = getColor(dimensionId)}
        <details
            class="text-white"
            on:toggle={(event) => onToggle(event, dimensionId)}
            open={$isDimensionOpen[dimensionId]}
        >
            <summary
                class={cx(
                    'flex cursor-pointer select-none !list-none items-center justify-between p-4 marker:!hidden',
                    color,
                )}
            >
                <span>
                    <span class="flex items-center">
                        <span class="text-xl font-bold">{name}</span>
                        <span class="px-2">&mdash;</span>
                        {description}
                        <NumberOfSelectedSkills {skillsInDimension} />
                    </span>
                </span>
                <div class="flex items-center">
                    <Expand open={$isDimensionOpen[dimensionId]} />
                </div>
            </summary>
            <div
                class={cx(
                    'flex flex-wrap justify-center gap-3 bg-opacity-70 p-4 border-t border-stone-900 text-stone-900',
                    color,
                )}
            >
                {#each getSkillsInDimension(dimensionId, content) as skill (skill.name)}
                    <SkillButton {skill} />
                {/each}
            </div>
        </details>
    {/each}
</div>
