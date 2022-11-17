<script lang="ts">
    import { cx } from '$lib/utils'
    import Button from '$shared/components/Button.svelte'
    import type { Skill } from '$shared/types'
    import { selectedSkills } from '$lib/stores'

    const toggleSkill = (skillId: Skill['id']) => {
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
        '!rounded-lg !font-normal bg-stone-50 text-sm xs:text-base',
        !$selectedSkills.includes(skill.id) && 'bg-opacity-50 shadow-lg',
        className,
    )}>{skill.name}</Button
>
