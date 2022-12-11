<script lang="ts">
    import { cx } from '$lib/utils'
    import Button from '$shared/components/Button.svelte'
    import type { Skill } from '$shared/types'
    import { selectedSkills } from '$lib/stores'

    const toggleSkill = (skillId: Skill['id']) => {
        // NOTE: Instead of recreating the array all the time, this might benefit from using a JS Set
        if ($selectedSkills.includes(skillId)) {
            $selectedSkills = $selectedSkills.filter((id) => id !== skillId)
        } else {
            $selectedSkills = [...$selectedSkills, skillId]
        }
    }

    export let skill: Skill
    let className = ''
    export { className as class }
</script>

<Button
    on:click={() => toggleSkill(skill.id)}
    size="sm"
    variant="unstyled"
    class={cx(
        'xs:text-base transform-gpu bg-stone-50 text-sm !font-normal duration-100',
        !$selectedSkills.includes(skill.id) && 'bg-opacity-50 shadow-lg hover:bg-opacity-75',
        className,
    )}>{skill.name}</Button
>
