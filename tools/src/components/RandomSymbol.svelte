<script lang="ts">
    import { cx, getColor, randomInt } from '$shared/utils'
    import { onMount } from 'svelte'
    import type { IDGSymbols, Skill } from '$shared/types'
    import { fade } from 'svelte/transition'
    import { COLORS } from '$shared/constants'
    import { IDGSymbol } from '$shared/icons'

    /** Only enable persistance when the component isn't part of an embedded page */
    export let isEmbedded = false
    export let skills: Skill[]
    export let symbols: IDGSymbols

    let randomSkill: Skill['id'] | undefined

    function getRandomSkill(skills: Skill[]) {
        if (!isEmbedded) {
            const id = localStorage.getItem('randomSkill')
            if (id && COLORS[id] !== undefined) return id
        }

        const randomSkill = skills[randomInt(0, skills.length - 1)].id

        if (!isEmbedded) {
            localStorage.setItem('randomSkill', randomSkill)
        }

        return randomSkill
    }

    onMount(() => {
        randomSkill = getRandomSkill(skills)
    })
</script>

<div class="flex justify-center px-2 pt-16">
    <div
        class={cx(
            'aspect-square h-72 w-72 rounded-lg p-8',
            randomSkill ? getColor(randomSkill) : 'bg-transparent',
        )}
    >
        {#if randomSkill}
            <div in:fade={{ duration: 500 }}>
                <IDGSymbol id={randomSkill} {symbols} class="h-full w-full text-white" />
            </div>
        {/if}
    </div>
</div>
