<script lang="ts">
    import { derived } from 'svelte/store'

    import { page } from '$app/stores'
    import { Heading } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { getDimension, getSkill, getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { IDGSymbol } from '$shared/icons'
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
    const selectedSkillIndex = derived(selectedSkill, (skill) =>
        skill
            ? getSkillsInDimension(skill.dimension, { skills }).findIndex(
                  (s) => s.id === skill.id,
              ) ?? 0
            : 0,
    )
    const selectedDimensionIndex = derived(selectedDimension, (dimension) =>
        dimension ? dimensions.findIndex((d) => d.id === dimension.id) ?? 0 : 0,
    )
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="min-h-[700px] bg-white relative pb-16 max-w-sm mx-auto">
    <div class="p-2 text-base h-full" class:hidden={!mounted}>
        <div class="flex justify-end">
            <LocaleSwitcher
                {supportedLocales}
                pathname={$page.url.pathname}
                currentLocale={$page.params.locale}
            />
        </div>

        <div class="text-white grid grid-cols-5">
            {#each dimensions as dimension (dimension.name)}
                {@const dimensionSlug = getDimensionSlug(dimension.id)}
                <button
                    class="p-2 grid place-items-center hover:outline hover:outline-1 hover:outline-black hover:-outline-offset-1 {$selectedDimensionId ===
                    dimension.id
                        ? `${getColor(dimension.id)}`
                        : 'bg-white'}"
                    on:click={() => {
                        $selectedDimensionId = dimension.id
                    }}
                >
                    <IDGSymbol
                        slug={dimensionSlug}
                        class="pointer-events-none w-12 h-12 {$selectedDimensionId === dimension.id
                            ? 'text-white'
                            : getColor(dimension.id, 'text')}"
                    />
                </button>
            {/each}
        </div>

        <div class={cx('p-2', getColor($selectedDimensionId))}>
            <Heading size={3} class="text-white text-center font-normal">
                {$selectedDimensionIndex + 1}
                {$selectedDimension?.name}
            </Heading>
        </div>
    </div>
</div>
