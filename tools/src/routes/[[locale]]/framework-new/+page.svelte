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
    import { Disclosure, DisclosureButton, DisclosurePanel } from '@rgossiaux/svelte-headlessui'
    import { text } from '@sveltejs/kit'
    import ChevronDown from '$shared/icons/ChevronDown.svelte'

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

<div class="min-h-[700px] bg-white relative pb-16 max-w-xs mx-auto">
    <div class="p-2 text-base h-full" class:hidden={!mounted}>
        <div class="flex justify-end">
            <LocaleSwitcher
                {supportedLocales}
                pathname={$page.url.pathname}
                currentLocale={$page.params.locale}
            />
        </div>

        <div class="text-white grid grid-cols-5">
            <!-- TODO: Use the Tab component -->
            {#each dimensions as dimension (dimension.name)}
                {@const dimensionSlug = getDimensionSlug(dimension.id)}
                <button
                    class="p-2 grid place-items-center {$selectedDimensionId === dimension.id
                        ? `${getColor(dimension.id)}`
                        : `bg-white hover:outline hover:outline-1 hover:outline-${getDimensionSlug(
                              dimension.id,
                          )} hover:-outline-offset-1`}"
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

        <div class={cx('p-2 drop-shadow-xl', getColor($selectedDimensionId))}>
            <Heading size={3} class="text-white text-center font-normal">
                {$selectedDimensionIndex + 1}
                {$selectedDimension?.name}
            </Heading>
        </div>

        <div class="w-full max-w-md py-2 bg-white grid gap-2 text-white">
            {#if $selectedDimension}
                {#each getSkillsInDimension( $selectedDimension.id, { skills }, ) as skill (skill.name)}
                    {@const dimensionSlug = getDimensionSlug(skill.id)}
                    {@const bgColor = getColor(skill.id, 'bg')}
                    {@const textColor = getColor(skill.id, 'text')}
                    <Disclosure class="grid" let:open>
                        <DisclosureButton
                            class={cx(
                                'p-2 flex gap-2 items-center hover:bg-white hover:text-black text-left group drop-shadow-xl',
                                bgColor,
                            )}
                        >
                            <!-- TODO: Replace with the skill symbols -->
                            <IDGSymbol
                                slug={dimensionSlug}
                                class="w-10 h-10 shrink-0 group-hover:!{textColor}"
                            />
                            <p class="text-sm w-full">
                                {skill.name}
                            </p>
                            <ChevronDown
                                class={cx('mx-1 flex-grow', open ? 'rotate-180' : 'rotate-0')}
                            />
                        </DisclosureButton>
                        <DisclosurePanel>
                            <Heading size={2} class={cx('p-4 break-words hyphens-auto', textColor)}
                                >{skill.name}</Heading
                            >
                            <div
                                class={cx(
                                    'mx-4 p-2 rounded-lg aspect-square flex items-center justify-center',
                                    bgColor,
                                )}
                            >
                                <IDGSymbol
                                    slug={dimensionSlug}
                                    class="pointer-events-none w-36 h-36 my-4 mx-auto text-white"
                                />
                            </div>
                            <p class="p-4 text-black">{skill.description}</p>
                        </DisclosurePanel>
                    </Disclosure>
                {/each}
            {/if}
        </div>
    </div>
</div>
