<script lang="ts">
    import IDGColors from '$components/IDGColors.svelte'
    import { COLORS } from '$shared/constants'
    import { getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import { cx } from '$shared/utils'

    export let skills: Skill[]
    export let dimensions: Dimension[]
</script>

<div class="grid gap-4 pt-12">
    <div class="flex aspect-video items-center justify-between bg-white shadow-md">
        <IDGColors />
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="400" height="220" />
        <IDGColors />
    </div>

    <div class="grid aspect-video place-items-center bg-white p-4 shadow-md">
        <div class="grid h-full w-full grid-cols-5 gap-2 p-8 text-white">
            {#each dimensions as dimension}
                {@const dimensionName = COLORS[dimension.id]}
                <div
                    class={cx(
                        `bg-${dimensionName}`,
                        'grid h-full grid-rows-[max-content_90px] gap-2 p-6 shadow-sm',
                    )}
                >
                    <img
                        src={`/images/symbols/${dimensionName}.png`}
                        alt={`IDG ${dimensionName} symbol`}
                        width="150"
                        height="150"
                        class="place-self-center"
                    />
                    <div class="border-y py-2">
                        <h2>{dimension.name}</h2>
                        <p class="text-sm">{dimension.description}</p>
                    </div>
                    {#each getSkillsInDimension(dimension.id, { skills }) as { name }}
                        <p class="text-sm">{name}</p>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>
