<script lang="ts">
    import { Button } from '$shared/components'
    import type { Skill } from '$shared/types'
    import { globalState } from '$lib/global-state.svelte'
    import { persistedState } from '$lib/persisted-state.svelte'

    const toggleSkill = (skillId: Skill['id']) => {
        globalState.listenForScroll = false
        // NOTE: Instead of recreating the array all the time, this might benefit from using a JS Set
        if (persistedState.selectedSkills.current.includes(skillId)) {
            persistedState.selectedSkills.current = persistedState.selectedSkills.current.filter(
                (id) => id !== skillId,
            )
        } else {
            persistedState.selectedSkills.current = [
                ...persistedState.selectedSkills.current,
                skillId,
            ]
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
        'xs:text-base font-normal! transform-gpu bg-white text-sm duration-100',
        !persistedState.selectedSkills.current.includes(skill.id) &&
            'bg-white/50 shadow-lg hover:bg-white/75',
        className,
    ]}>{skill.name}</Button
>
