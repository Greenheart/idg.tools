<script lang="ts">
    import { derived } from 'svelte/store'

    import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { cx, getColor, getDimensionSlug, randomInt } from '$shared/utils'
    import { getDimension } from '$shared/content-utils'
    import { browser } from '$app/environment'

    export let data: PageData

    // Ensure the page re-renders when the URL (and the data) changes.
    const dimensions = derived(page, () => data.dimensions)
    const skills = derived(page, () => data.skills)

    const randomSymbol = derived([skills, dimensions], ([skills, dimensions]) => {
        if (browser && skills && dimensions) {
            const skill = skills[randomInt(0, skills.length - 1)]
            const dimension = getDimension(skill.dimension, { dimensions })
            const skillIndex = dimension.skills.findIndex((skillId) => skillId === skill.id) + 1

            return {
                skill,
                symbol: `${getDimensionSlug(skill.id)}_${skillIndex}.svg`,
            }
        }
    })
</script>

<Meta title="IDG Symbols" description="Show a random IDG symbol" />

<!-- TODO: Move this into a separate layout group (inheriting from an empty root layout), similar to how we have done it for the communiity site -->

<!-- IDEA: If we add skill names, maybe add locale switcher too -->
<div class="grid justify-center h-[320px]">
    {#key $randomSymbol}
        {#if $randomSymbol}
            <div
                class={cx(
                    'h-[320px] w-[320px] aspect-square p-8 rounded-lg',
                    getColor($randomSymbol.skill.id),
                )}
            >
                <img
                    src="/symbols/{$randomSymbol.symbol}"
                    alt="IDG symbol for {$randomSymbol.skill.name}"
                />
            </div>
        {/if}
    {/key}
</div>
