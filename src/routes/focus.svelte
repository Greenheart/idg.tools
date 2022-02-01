<script lang="ts">
    import Button from '$components/Button.svelte'

    import {
        InnerDevelopmentGoals,
        IDGSkill,
        category,
        skillsInCategory,
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
</script>

<h1 class="px-8 pt-16 text-6xl tracking-wider md:pt-20">
    I want<br />to develop
</h1>

<div class="space-y-5 py-12 md:py-16">
    {#each InnerDevelopmentGoals.categories as { name, subtitle, id: categoryId, color }}
        <details class="text-stone-900">
            <summary
                class={cx(
                    '!list-none marker:!hidden p-4 select-none text-lg cursor-pointer',
                    color,
                )}
            >
                <span class="text-xl font-bold">{name}</span>
                <br />{subtitle}
            </summary>
            <div class="flex flex-wrap justify-center gap-3 px-4 pt-4">
                {#each skillsInCategory(categoryId) as skill (skill.name)}
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

<div class="mx-auto flex flex-col justify-center space-y-4 px-8">
    <Button on:click={saveChoices} label="Save choices" />
    <Button
        label="Reset"
        size="sm"
        on:click={reset}
        variant="secondary"
        class="self-center px-16"
    />
</div>
