<script lang="ts">
    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor } from '$lib/utils'
    import type { Content, Dimension } from '$shared/types'

    import NumberOfSelectedSkills from './NumberOfSelectedSkills.svelte'
    import SkillButton from './SkillButton.svelte'
    import Expand from './icons/Expand.svelte'

    export let content: Content

    let isDimensionOpen: Record<Dimension['id'], boolean> = Object.values(
        content.dimensions,
    ).reduce((isDimensionOpen: Record<Dimension['id'], boolean>, dimension) => {
        isDimensionOpen[dimension.id] = false
        return isDimensionOpen
    }, {})

    const onToggle = (
        event: Event & {
            currentTarget: EventTarget & HTMLElement
        },
        dimensionId: Dimension['id'],
    ) => {
        isDimensionOpen = {
            ...isDimensionOpen,
            [dimensionId]: (
                event?.target as unknown as EventTarget & HTMLDetailsElement
            ).open,
        }
        return isDimensionOpen
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
                    <Expand open={isDimensionOpen[dimensionId]} />
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
