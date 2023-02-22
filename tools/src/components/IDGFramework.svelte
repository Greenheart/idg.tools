<script lang="ts">
    import IDGColors from '$components/IDGColors.svelte'
    import { COLORS } from '$shared/constants'
    import { getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import { cx, getColor } from '$shared/utils'

    export let skills: Skill[]
    export let dimensions: Dimension[]
</script>

<!-- TODO: Add all localized content from the existing translations -->
<!-- TODO: Add allowed locales to the IDG CMS (pt, es, dk, ...) -->
<!-- TODO: Build multiple locales for the content. For now include all in content.json to allow client side switching -->
<!-- TODO: Add support for localized content in the IDG framework demo -->

<div class="grid gap-4 pt-12">
    <div class="flex aspect-video items-center justify-between bg-white shadow-md">
        <IDGColors />
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="490" height="270" />
        <IDGColors />
    </div>

    <div class="grid aspect-video place-items-center bg-white p-3 shadow-md">
        <div class="grid h-full w-full grid-cols-5 gap-2 p-4 text-white">
            {#each dimensions as dimension, i}
                {@const dimensionName = COLORS[dimension.id]}
                <div
                    class={cx(
                        'grid h-full grid-rows-[max-content_100px] gap-2 p-6 shadow-sm',
                        getColor(dimension.id),
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
                        <h2 class="font-black">
                            <span class="pr-2">{i + 1}</span>{dimension.name}
                        </h2>
                        <p class="text-base font-semibold">{dimension.description}</p>
                    </div>
                    <div class="flex flex-col justify-start gap-3 pt-1 text-base font-semibold">
                        {#each getSkillsInDimension(dimension.id, { skills }) as { name }}
                            <p>{name}</p>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    {#each dimensions as dimension, i}
        {@const dimensionName = COLORS[dimension.id]}
        <div class="grid aspect-video place-items-center bg-white p-3 shadow-md">
            <div
                class={cx(
                    'relative grid h-full w-full grid-cols-5 gap-2 p-8 text-white',
                    getColor(dimension.id),
                )}
            >
                <IDGColors class="absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
        </div>
    {/each}
</div>
