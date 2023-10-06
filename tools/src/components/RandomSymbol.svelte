<script lang="ts">
    import { cx, getColor, getDimensionSlug, randomInt } from '$shared/utils'
    import { getDimension } from '$shared/content-utils'
    import { onMount } from 'svelte'
    import type { Dimension, Skill } from '$shared/types'

    export let skills: Skill[]
    export let dimensions: Dimension[]

    /** Only enable persistance when the component isn't part of an embedded page */
    export let isEmbedded = false

    let randomSymbol: { skill: Skill; symbol: string }
    let visible = false

    function getRandomSymbol(skills: Skill[], dimensions: Dimension[]) {
        const skill = skills[randomInt(0, skills.length - 1)]
        const dimension = getDimension(skill.dimension, { dimensions })
        const skillIndex = dimension.skills.findIndex((skillId) => skillId === skill.id) + 1

        const randomSymbol = {
            skill,
            symbol: `${getDimensionSlug(skill.id)}_${skillIndex}.svg`,
        }

        if (!isEmbedded) {
            localStorage.setItem('randomSymbol', JSON.stringify(randomSymbol))
        }

        return randomSymbol
    }

    onMount(() => {
        if (!isEmbedded) {
            try {
                const raw = localStorage.getItem('randomSymbol')
                if (raw) {
                    randomSymbol = JSON.parse(raw)
                    return
                }
            } catch (error) {
                console.error(error)
            }
        }

        randomSymbol = getRandomSymbol(skills, dimensions)
    })
</script>

<div class="pt-16 px-2 flex justify-center">
    <div
        class={cx(
            'h-72 w-72 aspect-square p-8 rounded-lg',
            randomSymbol ? getColor(randomSymbol.skill.id) : 'bg-transparent',
        )}
        class:hidden={!visible}
    >
        {#if randomSymbol}
            <img
                src="/symbols/{randomSymbol.symbol}"
                alt="IDG symbol for {randomSymbol.skill.name}"
                on:load={() => (visible = true)}
            />
        {/if}
    </div>
</div>
