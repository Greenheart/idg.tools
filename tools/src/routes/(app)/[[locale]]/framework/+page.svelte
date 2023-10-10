<script lang="ts">
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { derived, writable } from 'svelte/store'

    import { page } from '$app/stores'
    import { Heading } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { getSkillsInDimension, getDimensionSlug } from '$shared/content-utils'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { IDGSymbol, ChevronDown } from '$shared/icons'
    import { cx, getColor } from '$shared/utils'

    export let data: PageData

    // Use a store to keep the same dimension selected when the locale changes
    const selectedDimensionIndex = writable(0)

    // Ensure the page re-renders when the locale changes.
    const dimensions = derived(page, () => data.dimensions)
    const skills = derived(page, () => data.skills)
    const symbols = derived(page, () => data.symbols)
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<!-- TODO: Allow the framework to expand to fill the viewport width -->
<div class="min-h-[700px] bg-white relative mb-16 max-w-screen-xl mx-auto">
    {#key $dimensions}
        {#if $dimensions}
            <div class="text-base h-full">
                <div class="flex justify-end p-2">
                    <LocaleSwitcher
                        supportedLocales={data.supportedLocales}
                        pathname={$page.url.pathname}
                        currentLocale={$page.params.locale}
                    />
                </div>

                <TabGroup defaultIndex={$selectedDimensionIndex}>
                    <TabList class="text-white grid grid-cols-5" let:selectedIndex>
                        {#each $dimensions as dimension, i (dimension.name)}
                            {@const dimensionSlug = getDimensionSlug(dimension.id)}
                            {@const isSelected = selectedIndex === i}
                            <Tab
                                class="p-2 grid place-items-center {isSelected
                                    ? `${getColor(dimension.id)}`
                                    : `bg-white hover:outline hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
                                on:click={() => {
                                    if (selectedIndex) {
                                        $selectedDimensionIndex = selectedIndex
                                    }
                                }}
                            >
                                <IDGSymbol
                                    id={dimension.id}
                                    symbols={$symbols}
                                    class="pointer-events-none w-12 h-12 {isSelected
                                        ? 'text-white'
                                        : getColor(dimension.id, 'text')}"
                                />
                                <p
                                    class="pt-2 font-medium hidden sm:block {isSelected
                                        ? 'text-white'
                                        : 'text-black'}"
                                >
                                    {dimension.name}
                                </p>
                            </Tab>
                        {/each}
                    </TabList>
                    <TabPanels>
                        {#each $dimensions as dimension, i (dimension.name)}
                            {@const dimensionSlug = getDimensionSlug(dimension.id)}
                            {@const bgColor = getColor(dimension.id, 'bg')}
                            {@const textColor = getColor(dimension.id, 'text')}
                            <TabPanel
                                class={cx(
                                    'w-full grid text-white sm:grid-cols-[minmax(300px,1fr)_2fr] sm:gap-2 bg-white sm:pt-2 items-start',
                                    bgColor,
                                )}
                            >
                                <div class="sticky top-0 {bgColor}">
                                    <Heading size={2} class="p-4 pb-1 break-words hyphens-auto"
                                        >{i + 1}. {dimension.name}</Heading
                                    >
                                    <Heading size={4} class="px-4">{dimension.subtitle}</Heading>
                                    <IDGSymbol
                                        id={dimension.id}
                                        symbols={$symbols}
                                        class="pointer-events-none w-36 h-36 my-4 mx-auto"
                                    />
                                    <p class="p-4 pt-0">{dimension.description}</p>
                                </div>

                                <div class="py-2 sm:p-0 bg-white space-y-2">
                                    {#each getSkillsInDimension( dimension.id, { skills: $skills }, ) as skill (skill.name)}
                                        <Disclosure class="grid" let:open>
                                            <DisclosureButton
                                                class={cx(
                                                    'p-2 flex gap-2 items-center hover:bg-white hover:text-black text-left group drop-shadow-xl',
                                                    `hover:outline hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`,
                                                    bgColor,
                                                )}
                                            >
                                                <IDGSymbol
                                                    id={skill.id}
                                                    symbols={$symbols}
                                                    class="w-10 h-10 shrink-0 group-hover:!{textColor}"
                                                />
                                                <p class="text-sm w-full">
                                                    {skill.name}
                                                </p>
                                                <ChevronDown
                                                    class={cx(
                                                        'mx-1 flex-grow',
                                                        open ? 'rotate-180' : 'rotate-0',
                                                    )}
                                                />
                                            </DisclosureButton>
                                            <DisclosurePanel
                                                class="bg-white sm:bg-transparent px-4 grid"
                                            >
                                                <Heading
                                                    size={2}
                                                    class={cx(
                                                        'py-4 break-words hyphens-auto',
                                                        textColor,
                                                    )}>{skill.name}</Heading
                                                >
                                                <div
                                                    class={cx(
                                                        'rounded-lg flex items-center py-4 justify-center',
                                                        bgColor,
                                                    )}
                                                >
                                                    <IDGSymbol
                                                        id={skill.id}
                                                        symbols={$symbols}
                                                        class="pointer-events-none w-36 h-36 text-white"
                                                    />
                                                </div>
                                                <p class="py-4 text-black">
                                                    {skill.description}
                                                </p>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    {/each}
                                </div>
                            </TabPanel>
                        {/each}
                    </TabPanels>
                </TabGroup>
            </div>
        {/if}
    {/key}
</div>
