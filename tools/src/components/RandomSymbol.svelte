<script lang="ts">
    import { getColor, randomInt } from '$shared/utils'
    import { onMount } from 'svelte'
    import type { IDGSymbols, Skill } from '$shared/types'
    import { fade } from 'svelte/transition'
    import { COLORS } from '$shared/constants'
    import { IDGSymbol } from '$shared/icons'

    interface Props {
        /** Only enable persistance when the component isn't part of an embedded page */
        isEmbedded?: boolean
        skills: Skill[]
        symbols: IDGSymbols
    }

    let { isEmbedded = false, skills, symbols }: Props = $props()

    let randomSkill = $state<Skill['id']>()
    let skillName = $state<Skill['name']>()!

    function getRandomSkill(skills: Skill[]) {
        if (!isEmbedded) {
            const id = localStorage.getItem('randomSkill')
            if (id && COLORS[id] !== undefined) return id
        }

        const randomSkill = skills[randomInt(0, skills.length - 1)]
        skillName = randomSkill.name

        if (!isEmbedded) {
            localStorage.setItem('randomSkill', randomSkill.id)
        }

        return randomSkill.id
    }

    onMount(() => {
        randomSkill = getRandomSkill(skills)
    })
</script>

<div class="flex justify-center px-2 pt-16">
    <div
        class={[
            'aspect-square h-72 w-72 rounded-lg p-8',
            randomSkill ? getColor(randomSkill) : 'bg-transparent',
        ]}
    >
        {#if randomSkill}
            <div in:fade={{ duration: 500 }}>
                <IDGSymbol
                    symbolPaths={symbols[randomSkill]}
                    aria-label={skillName}
                    class="h-full w-full text-white"
                />
            </div>
        {/if}
    </div>
</div>
