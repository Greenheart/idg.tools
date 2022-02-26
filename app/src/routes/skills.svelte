<script lang="ts">
    import { onMount } from 'svelte'

    import { getSkillsInCategory } from '$lib/content-utils'
    import { cx } from '$lib/utils'
    import { selectedSkills } from '$lib/stores'
    import type { Content, Category, Skill } from '$lib/types'

    import Button from '$components/Button.svelte'
    import LinkButton from '$components/LinkButton.svelte'
    import Heading from '$components/Heading.svelte'

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

<Heading size={1}>
    I want<br />to develop
</Heading>

<div class="space-y-4 py-12">
    {#each content.categories as { name, description, id: categoryId, color }}
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
                <svg
                    class={cx(
                        'h-6 w-6 transform transition duration-150',
                        isCategoryOpen[categoryId] ? 'rotate-0' : 'rotate-45',
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
                        class="!rounded-lg"
                    />
                {/each}
            </div>
        </details>
    {/each}
</div>

<div class="mx-auto flex flex-col items-center space-y-4 px-8">
    <LinkButton href="/explore">Continue</LinkButton>
</div>

<style>
    details > summary {
        list-style: none;
    }
    details > summary::-webkit-details-marker {
        display: none;
    }
</style>
