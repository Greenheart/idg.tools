<script lang="ts">
    import { getSkillsInCategory } from '$shared/content-utils'
    import { cx, getColor } from '$lib/utils'
    import type { Content, Category } from '$shared/types'

    import NumberOfSelectedSkills from './NumberOfSelectedSkills.svelte'
    import SkillButton from './SkillButton.svelte'

    export let content: Content

    let isCategoryOpen: Record<Category['id'], boolean> = Object.values(
        content.categories,
    ).reduce((isCategoryOpen: Record<Category['id'], boolean>, category) => {
        isCategoryOpen[category.id] = false
        return isCategoryOpen
    }, {})

    const onToggle = (
        event: Event & {
            currentTarget: EventTarget & HTMLElement
        },
        categoryId: Category['id'],
    ) => {
        isCategoryOpen = {
            ...isCategoryOpen,
            [categoryId]: (
                event?.target as unknown as EventTarget & HTMLDetailsElement
            ).open,
        }
        return isCategoryOpen
    }
</script>

<div class="space-y-4">
    {#each content.categories as { name, description, id: categoryId, skills: skillsInCategory }}
        {@const color = getColor(categoryId)}
        <details
            class="text-stone-900"
            on:toggle={(event) => onToggle(event, categoryId)}
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
                        <NumberOfSelectedSkills {skillsInCategory} />
                    </span>
                </span>
                <div class="flex items-center">
                    <svg
                        class={cx(
                            'h-6 w-6 transform transition duration-150',
                            isCategoryOpen[categoryId]
                                ? 'rotate-0'
                                : 'rotate-45',
                        )}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            </summary>
            <div
                class={cx(
                    'flex flex-wrap justify-center gap-3 bg-opacity-70 p-4 border-t border-stone-900',
                    color,
                )}
            >
                {#each getSkillsInCategory(categoryId, content) as skill (skill.name)}
                    <SkillButton {skill} />
                {/each}
            </div>
        </details>
    {/each}
</div>

<style>
    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>
