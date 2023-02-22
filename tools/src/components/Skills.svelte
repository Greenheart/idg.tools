<script lang="ts">
    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor } from '$lib/utils'
    import type { ToolsContent, Dimension } from '$shared/types'
    import { isDimensionOpen } from '$lib/stores'

    import NumberOfSelectedSkills from './NumberOfSelectedSkills.svelte'
    import SkillButton from './SkillButton.svelte'
    import Expand from '$shared/icons/Expand.svelte'

    export let content: ToolsContent

    const onToggle = (
        event: Event & {
            currentTarget: EventTarget & HTMLElement
        },
        dimensionId: Dimension['id'],
    ) => {
        $isDimensionOpen = {
            ...$isDimensionOpen,
            [dimensionId]: (event?.target as unknown as EventTarget & HTMLDetailsElement).open,
        }
    }

    let className = ''
    export { className as class }
</script>

<div class={cx('space-y-4', className)}>
    {#each content.dimensions as { name, subtitle, id: dimensionId, skills: skillsInDimension }, index}
        {@const color = getColor(dimensionId)}
        <details
            class="text-white"
            on:toggle={(event) => onToggle(event, dimensionId)}
            open={$isDimensionOpen[dimensionId]}
        >
            <summary
                class={cx(
                    'flex cursor-pointer select-none !list-none items-center justify-between px-2 py-4 marker:!hidden sm:px-4',
                    color,
                )}
                tabindex={index + 1}
            >
                <span>
                    <span class="flex items-center text-xs sm:text-base md:text-base">
                        <span class="text-base font-bold sm:text-lg md:text-xl">{name}</span>
                        <span class="px-1 md:px-2">&mdash;</span>
                        {subtitle}
                        <NumberOfSelectedSkills {skillsInDimension} />
                    </span>
                </span>
                <div class="flex items-center">
                    <Expand open={$isDimensionOpen[dimensionId]} />
                </div>
            </summary>
            <div
                class={cx(
                    'flex flex-wrap justify-center gap-2 border-t border-black bg-opacity-70 p-4 text-black',
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
