<script lang="ts">
    import Button from '$components/Button.svelte'

    import { InnerDevelopmentGoals, IDGSkill } from '$lib/idgs'
    import { cx } from '$lib/utils'

    let selected: IDGSkill[] = []

    const toggleSkill = (skill: IDGSkill) => {
        if (isSkillSelected(skill)) {
            selected = selected.filter((s) => s.id !== skill.id)
        } else {
            selected = [...selected, skill]
        }
    }

    const isSkillSelected = (skill: IDGSkill) =>
        selected.some((s) => s.id === skill.id)

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

<h1 class="pt-16 text-6xl tracking-wider md:pt-20">
    I want<br />to develop.
</h1>

<div class="space-y-6 py-12 md:py-16">
    {#each InnerDevelopmentGoals.categories as { name, subtitle, id: categoryId, color }}
        <details class="text-stone-900">
            <summary
                class={cx('!list-none marker:!hidden p-4 select-none', color)}
            >
                <span class="font-xl font-bold">{name}</span>
                <br />{subtitle}
            </summary>
            <div class="flex flex-wrap justify-center gap-2 p-4">
                <!-- TODO: get skills to re-render when selected changes. -->
                <!-- TODO: get skills to render with correct colors matching the idgs -->
                <!-- TODO: Add colors to each skill, both original hex and our custom hex -->
                {#each InnerDevelopmentGoals.skills.filter((s) => s.category === categoryId) as skill}
                    <Button
                        label={skill.name}
                        on:click={() => toggleSkill(skill)}
                        variant={isSkillSelected(skill) ? 'active' : 'primary'}
                        size="sm"
                    />
                {/each}
            </div>
        </details>
    {/each}
</div>

<div class="mx-auto flex flex-col justify-center space-y-4">
    <Button on:click={saveChoices} label="Save choices" />
    <Button
        label="Reset"
        size="sm"
        on:click={reset}
        variant="secondary"
        class="self-center px-16"
    />
</div>
