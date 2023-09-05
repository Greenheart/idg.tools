<script lang="ts">
    import { derived } from 'svelte/store'

    import { page } from '$app/stores'
    import { Heading } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { getDimension, getSkill, getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { Arrow, IDGSymbol } from '$shared/icons'
    import { cx, getColor, getDimensionSlug } from '$shared/utils'
    import persistedStore from '$lib/persistedStore'
    import { onMount } from 'svelte'
    import { tweened } from 'svelte/motion'
    import { cubicOut } from 'svelte/easing'

    export let data: PageData
    $: ({ skills, dimensions, supportedLocales } = data)

    const selectedSkillId = persistedStore<Skill['id']>('framework_skillId', '')
    const selectedDimensionId = persistedStore<Dimension['id']>('framework_dimensionId', '')
    let mounted = false

    onMount(() => {
        selectedSkillId.useLocalStorage()
        selectedDimensionId.useLocalStorage()
        mounted = true
    })

    // Derive from page store to keep selection even when the page language changes
    const selectedSkill = derived([selectedSkillId, page], ([id]) =>
        id ? getSkill(id as unknown as Skill['id'], { skills }) : undefined,
    )
    const selectedDimension = derived([selectedDimensionId, page], ([id]) =>
        id ? getDimension(id as unknown as Dimension['id'], { dimensions }) : undefined,
    )
    const selectedSkillIndex = derived(selectedSkill, (skill) =>
        skill
            ? getSkillsInDimension(skill.dimension, { skills }).findIndex(
                  (s) => s.id === skill.id,
              ) ?? 0
            : 0,
    )
    // const selectedDimensionIndex = derived(selectedDimension, (dimension) =>
    //     dimension
    //         ? getSkillsInDimension(skill.dimension, { skills }).findIndex(
    //               (s) => s.id === skill.id,
    //           ) ?? 0
    //         : 0,
    // )

    function onBack() {
        if ($selectedSkillId) {
            $selectedSkillId = ''
        } else if ($selectedDimensionId) {
            $selectedDimensionId = ''
        }
    }

    // function prevDimension() {
    //     if ($selectedDimension && $selectedDimensionIndex > 0) {
    //         $selectedDimensionId = dimensions[$selectedDimensionIndex - 1].id
    //     }
    // }

    // function nextDimension() {
    //     if ($selectedDimension && $selectedDimensionIndex < dimensions.length - 1) {
    //         $selectedDimensionId = dimensions[$selectedDimensionIndex + 1].id
    //     }
    // }

    function prevSkill() {
        if ($selectedDimension && $selectedSkillIndex > 0) {
            $selectedSkillId = $selectedDimension.skills[$selectedSkillIndex - 1]
        }
    }

    function nextSkill() {
        if ($selectedDimension && $selectedSkillIndex < $selectedDimension.skills.length - 1) {
            $selectedSkillId = $selectedDimension.skills[$selectedSkillIndex + 1]
        }
    }

    const angle = 30
    const animationAngle = tweened(0, {
        easing: cubicOut,
        duration: 600,
    })
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="min-h-[700px] bg-white relative pb-16 max-w-sm mx-auto">
    <div class="p-2 text-base h-full" class:hidden={!mounted}>
        <div class="flex justify-between">
            <button on:click={onBack}>back</button>
            <LocaleSwitcher
                {supportedLocales}
                pathname={$page.url.pathname}
                currentLocale={$page.params.locale}
            />
        </div>

        <div
            style:transform="rotate({$animationAngle}deg)"
            class="text-white relative w-80 h-80 rounded-full center"
        >
            {#each dimensions as dimension, i (dimension.name)}
                {@const dimensionSlug = getDimensionSlug(dimension.id)}
                <button
                    class="p-2 hover:drop-shadow-lg symbol"
                    style:transform="rotate({180 - angle * (i + 1)}deg) translate(120px)"
                    on:click={() => {
                        $selectedDimensionId = dimension.id
                        switch (i) {
                            case 0:
                                $animationAngle = -60
                                break
                            case 1:
                                $animationAngle = -30
                                break
                            case 2:
                                $animationAngle = 0
                                break
                            case 3:
                                $animationAngle = 30
                                break
                            case 4:
                                $animationAngle = 60
                                break
                        }
                    }}
                >
                    <IDGSymbol
                        slug={dimensionSlug}
                        style="transform: rotate({180 + angle * (i + 1) - $animationAngle}deg)"
                        class="pointer-events-none w-12 h-12 {getColor(dimension.id, 'text')}"
                    />
                </button>
            {/each}
        </div>
        <div class="flex justify-between items-center">
            <!-- <button class="" on:click={prevDimension}><Arrow left /></button> -->
            <!-- <button class="" on:click={nextDimension}><Arrow right /></button> -->
        </div>
        <h2 class="text-black mt-8 text-center">
            {$selectedDimension?.name}
        </h2>
    </div>
</div>

<style>
    .center:before {
        position: absolute;
        height: 90px;
        width: 180px;
        border-radius: 90px 90px 0 0;
        background: transparent;
        content: '';
    }

    .symbol {
        border-radius: 50%;
        display: block;
        position: absolute;
        overflow: hidden;
        top: 50%;
        left: 50%;
        margin: -15px;
    }
</style>
