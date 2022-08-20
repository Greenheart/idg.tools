<script lang="ts">
    import { onMount } from 'svelte'

    import { getSkillsInCategory } from '$shared/content-utils'
    import { cx } from '$lib/utils'
    import { selectedSkills } from '$lib/stores'
    import type { Content, Category, Skill } from '$shared/runtime-types'

    import Button from '$components/Button.svelte'
    import Heading from '$components/Heading.svelte'
    import NumberOfSelectedSkills from './NumberOfSelectedSkills.svelte'

    export let content: Content

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })

    const toggleSkill = (skillId: Skill['id']) => {
        if ($selectedSkills.includes(skillId)) {
            $selectedSkills = $selectedSkills.filter((id) => id !== skillId)
        } else {
            $selectedSkills = [...$selectedSkills, skillId]
        }
    }

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

<Heading size={3}>Choose the skills you want to focus on:</Heading>

<div class="space-y-4 py-4" id="skills">
    {#each content.categories as { name, description, id: categoryId, color, skills: skillsInCategory }}
        <details
            class={cx('text-stone-900')}
            on:toggle={(event) => onToggle(event, categoryId)}
        >
            <summary
                class="flex cursor-pointer select-none !list-none items-center justify-between p-4 marker:!hidden"
                style:background-color={color}
            >
                <span>
                    <span class="text-xl font-bold">{name}</span>
                    <br />{description}
                </span>
                <div class="flex items-center space-x-4">
                    <NumberOfSelectedSkills {skillsInCategory} />
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
            <div class="justify-left flex flex-wrap gap-3 px-4 pt-4">
                {#each getSkillsInCategory(categoryId, content) as skill (skill.name)}
                    <Button
                        label={skill.name}
                        on:click={() => toggleSkill(skill.id)}
                        size="sm"
                        style={$selectedSkills.includes(skill.id)
                            ? `background-color: ${color}`
                            : undefined}
                        class="!rounded-lg !font-normal"
                    />
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
