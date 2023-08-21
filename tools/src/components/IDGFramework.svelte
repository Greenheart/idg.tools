<script lang="ts">
    import IDGColors from '$components/IDGColors.svelte'
    import { COLORS } from '$shared/constants'
    import { getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import { cx, getColor } from '$shared/utils'
    import { IDGLogo } from '$shared/icons'

    export let skills: Skill[]
    export let dimensions: Dimension[]
</script>

<!-- TODO: Add all localised content from the existing translations -->
<!-- TODO: Add allowed locales to the IDG CMS (pt, es, dk, ...) -->

<div class="grid gap-4 pt-12">
    <div class="flex aspect-video items-center justify-between bg-white shadow-md">
        <IDGColors />
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="490" height="270" />
        <IDGColors />
    </div>

    <div class="grid aspect-video place-items-center bg-white p-3 shadow-md">
        <div class="grid h-full w-full grid-cols-5 gap-2 text-white">
            {#each dimensions as dimension, i}
                {@const dimensionName = COLORS[dimension.id]}
                <div
                    class={cx(
                        'grid-cols-[repeat(1, minmax(0, max-content))] grid h-full grid-rows-[max-content_106px] gap-2 p-6 shadow-sm',
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
                    <div class="overflow-hidden break-words border-y py-2">
                        <h2 class="font-black">
                            <span class="pr-2">{i + 1}</span>{dimension.name}
                        </h2>
                        <p class="text-base font-semibold leading-5">{dimension.subtitle}</p>
                    </div>
                    <div
                        class="flex flex-col justify-start gap-4 overflow-hidden break-words pt-1 text-base font-semibold leading-5"
                    >
                        {#each getSkillsInDimension(dimension.id, { skills }) as { name }}
                            <p>{name}</p>
                        {/each}
                    </div>
                </div>
            {/each}
        </div>
    </div>

    {#each dimensions as dimension}
        {@const dimensionName = COLORS[dimension.id]}
        {@const color = getColor(dimension.id)}
        <div class="grid aspect-video place-items-center bg-white p-3 shadow-md">
            <div
                class={cx(
                    'relative grid h-full w-full grid-cols-[6fr_7fr] gap-6 px-8 py-3 text-white',
                    color,
                )}
            >
                <div class="relative my-8 ml-8">
                    <!-- NOTE: Since the exported symbols have excess whitespace in them, we have to compensate with a negative margin to fix alignment -->
                    <img
                        src={`/images/symbols/${dimensionName}.png`}
                        alt={`IDG ${dimensionName} symbol`}
                        width="130"
                        height="130"
                        class="-ml-2 pb-2"
                    />
                    <h2 class="pb-2 text-6xl font-extrabold">{dimension.name}</h2>
                    <h3 class="pb-4 text-3xl font-bold">{dimension.subtitle}</h3>

                    <p class="max-w-xs text-base leading-5">
                        {dimension.description}
                    </p>
                    <IDGLogo class="absolute bottom-0 h-[60px] w-[110px] flex-grow text-white/40" />
                </div>
                <div class="my-8 mr-8 flex flex-col gap-6 text-base">
                    {#each getSkillsInDimension(dimension.id, { skills }) as skill}
                        <div>
                            <p class="font-extrabold">{skill.name}</p>
                            <p>{skill.description}</p>
                        </div>
                    {/each}
                </div>
                <IDGColors class="absolute right-0 top-1/2 -translate-y-1/2" />
            </div>
        </div>
    {/each}
</div>
