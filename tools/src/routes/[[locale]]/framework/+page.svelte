<script lang="ts">
    import { derived, writable } from 'svelte/store'

    import { page } from '$app/stores'
    import { Heading, Link } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { COLORS, IDG_REPORT_PDF } from '$shared/constants'
    import { getDimension, getItem, getSkill, getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { Arrow } from '$shared/icons'
    import { cx, getColor, getDimensionSlug } from '$shared/utils'
    import persistedStore from '$lib/persistedStore'
    import { onMount } from 'svelte'

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

    function onBack() {
        if ($selectedSkillId) {
            $selectedSkillId = ''
        } else if ($selectedDimensionId) {
            $selectedDimensionId = ''
        }
    }
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="grid bg-white min-h-[680px]">
    <div class="p-2 max-w-xs text-base" class:hidden={!mounted}>
        <div class="flex items-center justify-between shadow-md">
            {#if $selectedDimensionId}
                <button class="hover:bg-stone-100 h-10 w-10" on:click={onBack}>
                    <Arrow left /></button
                >
            {:else}
                <div />
            {/if}
            <LocaleSwitcher {supportedLocales} />
        </div>
        {#if !$selectedDimension}
            <div class="py-4">
                <Heading size={2}>Inner Development Goals</Heading>
            </div>

            <div class="grid font-semibold text-white gap-2 leading-5">
                {#each dimensions as dimension (dimension.name)}
                    {@const dimensionSlug = getDimensionSlug(dimension.id)}
                    <button
                        class={cx(
                            getColor(dimension.id),
                            'p-2 flex gap-2 items-center hover:drop-shadow-lg text-left',
                        )}
                        on:click={() => {
                            $selectedDimensionId = dimension.id
                        }}
                    >
                        <img
                            src={`/images/symbols/${dimensionSlug}.svg`}
                            alt={`IDG ${dimensionSlug} symbol`}
                            width="50"
                            height="50"
                            class="invert pointer-events-none"
                        />
                        <span>
                            {dimension.name}
                        </span>
                    </button>
                {/each}
            </div>
        {:else if !$selectedSkill}
            {@const dimensionSlug = getDimensionSlug($selectedDimension.id)}
            <div class={cx(getColor($selectedDimension.id), 'text-white')}>
                <Heading size={2} class="p-4 pb-1">{$selectedDimension?.name}</Heading>
                <Heading size={4} class="px-4">{$selectedDimension?.subtitle}</Heading>
                <img
                    src={`/images/symbols/${dimensionSlug}.svg`}
                    alt={`IDG ${dimensionSlug} symbol`}
                    width="150"
                    height="150"
                    class="invert pointer-events-none mx-auto py-4"
                />
                <p class="px-4">{$selectedDimension.description}</p>

                <div class="pt-4 grid font-semibold text-white leading-5">
                    {#each getSkillsInDimension( $selectedDimension.id, { skills }, ) as skill (skill.name)}
                        <!-- TODO: Replace with the skill symbols -->
                        <button
                            class={cx(
                                getColor(skill.id),
                                'p-2 flex gap-2 items-center hover:drop-shadow-lg text-left',
                            )}
                            on:click={() => {
                                $selectedSkillId = skill.id
                            }}
                        >
                            <img
                                src={`/images/symbols/${dimensionSlug}.svg`}
                                alt={`IDG ${dimensionSlug} symbol`}
                                width="50"
                                height="50"
                                class="invert pointer-events-none"
                            />
                            <p>
                                {skill.name}
                            </p>
                        </button>
                    {/each}
                </div>
            </div>
        {:else}
            <Heading size={2} class="mt-4 mb-4">{$selectedSkill?.name}</Heading>
            <p>{$selectedSkill.description}</p>
        {/if}
    </div>
</div>
