<script lang="ts">
    import { Button } from '$shared/components'
    import type { Skill } from '$shared/types'
    import { globalState } from '$lib/global-state.svelte'

    const toggleSkill = (skillId: Skill['id']) => {
        globalState.listenForScroll = false
        // NOTE: Instead of recreating the array all the time, this might benefit from using a JS Set
        if (globalState.selectedSkills.current.includes(skillId)) {
            globalState.selectedSkills.current = globalState.selectedSkills.current.filter(
                (id) => id !== skillId,
            )
        } else {
            globalState.selectedSkills.current = [...globalState.selectedSkills.current, skillId]
        }
        setTimeout(() => {
            globalState.listenForScroll = true
        }, 100)
    }

    interface Props {
        skill: Skill
        class?: string
    }

    let { skill, class: className = '' }: Props = $props()
</script>

<Button
    onclick={() => toggleSkill(skill.id)}
    size="sm"
    unstyled
    class={[
        'xs:text-base transform-gpu bg-white text-sm font-normal! duration-100',
        !globalState.selectedSkills.current.includes(skill.id) &&
            'bg-opacity-50 shadow-lg hover:bg-opacity-75',
        className,
    ]}>{skill.name}</Button
>
