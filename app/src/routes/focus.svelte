<script lang="ts">
    import Button from '$components/Button.svelte'

    import {
        InnerDevelopmentGoals,
        IDGSkill,
        IDGCategory,
        getSkillsInCategory,
    } from '$lib/idgs'
    import { cx } from '$lib/utils'

    let selected: IDGSkill[] = []

    const toggleSkill = (skill: IDGSkill) => {
        if (selected.some((s) => s.id === skill.id)) {
            selected = selected.filter((s) => s.id !== skill.id)
        } else {
            selected = [...selected, skill]
        }
    }

    const reset = () => {
        selected = []
    }

    const saveChoices = () => {
        if (!selected.length) {
            // Use all skills if no specific ones were selected
            selected = InnerDevelopmentGoals.skills.slice()
        }

        console.log(selected)

        // TODO: Save choices in localStorage (or IndexedDB in the future for a app beyond the PoC stage)
        // TODO: Navigate to the next screen, using svelte's built-in router
    }

    let isCategoryOpen: Record<IDGCategory['id'], boolean> = Object.values(
        InnerDevelopmentGoals.categories,
    ).reduce((isCategoryOpen: Record<IDGCategory['id'], boolean>, category) => {
        isCategoryOpen[category.id] = false
        return isCategoryOpen
    }, {})
    const onToggle = (
        event: Event & {
            currentTarget: EventTarget & HTMLElement
        },
        categoryId: IDGCategory['id'],
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

<h1 class="px-5 pt-12 text-6xl tracking-wider md:pt-20">
    I want<br />to develop
</h1>

<div class="space-y-5 py-12 md:py-16">
    {#each InnerDevelopmentGoals.categories as { name, subtitle, id: categoryId, color }}
        <details
            class={cx('text-stone-900')}
            on:toggle={(event) => onToggle(event, categoryId)}
        >
            <summary
                class={cx(
                    '!list-none marker:!hidden p-4 select-none text-lg cursor-pointer flex justify-between items-center',
                    color,
                )}
            >
                <span>
                    <span class="text-xl font-bold">{name}</span>
                    <br />{subtitle}
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
            <div class="flex flex-wrap justify-center gap-3 px-4 pt-4">
                {#each getSkillsInCategory(categoryId) as skill (skill.name)}
                    <Button
                        label={skill.name}
                        on:click={() => toggleSkill(skill)}
                        size="sm"
                        class={selected.some((s) => s.id === skill.id)
                            ? color
                            : undefined}
                    />
                {/each}
            </div>
        </details>
    {/each}
</div>

<div class="mx-auto flex flex-col items-center space-y-4 px-8">
    <Button on:click={saveChoices} label="Save choices" />
    <Button
        label="Reset"
        size="sm"
        on:click={reset}
        variant="secondary"
        class="self-center px-16"
    />
</div>
