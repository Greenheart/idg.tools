<script lang="ts">
    import IDGColors from '$components/IDGColors.svelte'
    import { getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'

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
            <div class="bg-being grid h-full grid-rows-[max-content_90px] gap-2 p-6 shadow-sm">
                <img
                    src="/images/symbols/being.png"
                    alt="IDG being symbol"
                    width="150"
                    height="150"
                    class="place-self-center"
                />
                <div class="border-y py-2">
                    <h2>{dimensions[0].name}</h2>
                    <p class="text-sm">{dimensions[0].description}</p>
                </div>
                {#each getSkillsInDimension(dimensions[0].id, { skills }) as { name }}
                    <p class="text-sm">{name}</p>
                {/each}
            </div>
            <div class="bg-thinking grid h-full grid-rows-[max-content_90px] gap-2 p-6 shadow-sm">
                <img
                    src="/images/symbols/thinking.png"
                    alt="IDG thinking symbol"
                    width="150"
                    height="150"
                    class="place-self-center"
                />
                <div class="border-y py-2">
                    <h2>{dimensions[1].name}</h2>
                    <p class="text-sm">{dimensions[1].description}</p>
                </div>
                {#each getSkillsInDimension(dimensions[1].id, { skills }) as { name }}
                    <p class="text-sm">{name}</p>
                {/each}
            </div>
            <div class="bg-relating grid h-full grid-rows-[max-content_90px] gap-2 p-6 shadow-sm">
                <img
                    src="/images/symbols/relating.png"
                    alt="IDG relating symbol"
                    width="150"
                    height="150"
                    class="place-self-center"
                />
                <div class="border-y py-2">
                    <h2>{dimensions[2].name}</h2>
                    <p class="text-sm">{dimensions[2].description}</p>
                </div>
                {#each getSkillsInDimension(dimensions[2].id, { skills }) as { name }}
                    <p class="text-sm">{name}</p>
                {/each}
            </div>
            <div
                class="bg-collaborating grid h-full grid-rows-[max-content_90px] gap-2 p-6 shadow-sm"
            >
                <img
                    src="/images/symbols/collaborating.png"
                    alt="IDG collaborating symbol"
                    width="150"
                    height="150"
                    class="place-self-center"
                />
                <div class="border-y py-2">
                    <h2>{dimensions[3].name}</h2>
                    <p class="text-sm">{dimensions[3].description}</p>
                </div>
                {#each getSkillsInDimension(dimensions[3].id, { skills }) as { name }}
                    <p class="text-sm">{name}</p>
                {/each}
            </div>
            <div class="bg-acting grid h-full grid-rows-[max-content_90px] gap-2 p-6 shadow-sm">
                <img
                    src="/images/symbols/acting.png"
                    alt="IDG acting symbol"
                    width="150"
                    height="150"
                    class="place-self-center"
                />
                <div class="border-y py-2">
                    <h2>{dimensions[4].name}</h2>
                    <p class="text-sm">{dimensions[4].description}</p>
                </div>
                {#each getSkillsInDimension(dimensions[4].id, { skills }) as { name }}
                    <p class="text-sm">{name}</p>
                {/each}
            </div>
        </div>
    </div>
</div>
