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
    import { derived, writable, type Readable } from 'svelte/store'

    import { Heading, LocaleSwitcher } from '$shared/components'
    import {
        getSkillsInDimension,
        getDimensionSlug,
        getSkill,
        getDimensionIndexBySlug,
    } from '$shared/content-utils'
    import { IDGSymbol, ChevronDown } from '$shared/icons'
    import { cx, getColor } from '$shared/utils'
    import type {
        Dimension,
        DimensionSlug,
        IDGSymbols,
        Skill,
        SupportedLocales,
    } from '$shared/types'

    export let skills: Readable<Skill[]>
    export let dimensions: Readable<Dimension[]>
    export let symbols: Readable<IDGSymbols>

    export let currentLocale: string
    export let supportedLocales: SupportedLocales
    export let pathname: string
    export let selectedDimension: Readable<DimensionSlug | undefined> | undefined = undefined

    // Use a store to keep the same selected dimension and skill when the locale changes
    const selectedDimensionIndex = writable(
        $selectedDimension ? getDimensionIndexBySlug($selectedDimension) : 0,
    )
    const selectedSkill = writable<Skill['id'] | null>(null)

    /** The actual currently selected skill */
    const focusedSkill = derived(
        [selectedSkill, skills, dimensions, selectedDimensionIndex],
        ([skillId, skills, dimensions, selectedDimensionIndex]) => {
            const id = skillId ?? dimensions[selectedDimensionIndex].skills[0]

            return getSkill(id, { skills })
        },
    )
</script>

<div class="min-h-[700px] bg-white relative max-w-screen-xl mx-auto">
    {#key $dimensions}
        {#if $dimensions}
            <div class="text-base h-full">
                <div class="flex justify-end p-2">
                    <LocaleSwitcher
                        {supportedLocales}
                        pathname={$selectedDimension
                            ? `${pathname}#${$selectedDimension}`
                            : pathname}
                        {currentLocale}
                    />
                </div>

                <TabGroup
                    defaultIndex={$selectedDimensionIndex}
                    on:change={(event) => {
                        if (event.detail !== $selectedDimensionIndex) {
                            $selectedDimensionIndex = event.detail
                            $selectedSkill = $dimensions[event.detail].skills[0]
                        }
                    }}
                >
                    <TabList
                        class="text-white grid grid-cols-5 {$selectedDimension ? 'hidden' : ''}"
                    >
                        {#each $dimensions as dimension, i (dimension.name)}
                            {@const dimensionSlug = getDimensionSlug(dimension.id)}
                            {@const isSelected = $selectedDimensionIndex === i}
                            <Tab
                                class="py-2 xs:px-2 grid place-items-center {isSelected
                                    ? `${getColor(dimension.id)}`
                                    : `bg-white hover:outline hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
                            >
                                <IDGSymbol
                                    id={dimension.id}
                                    symbols={$symbols}
                                    class="pointer-events-none w-12 h-12 {isSelected
                                        ? 'text-white'
                                        : getColor(dimension.id, 'text')}"
                                />
                                <p
                                    class="pt-2 font-medium hidden sm:block text-sm md:text-base {isSelected
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
                                class="w-full grid text-white sm:grid-cols-[minmax(260px,1fr)_2fr] lg:grid-cols-[minmax(260px,1fr)_1fr_1fr] sm:gap-2 bg-white sm:pt-2 items-start"
                            >
                                <div class="sm:sticky sm:top-0 {bgColor}">
                                    <h2
                                        class="text-2xl md:text-3xl font-bold p-4 pb-1 break-words hyphens-auto"
                                    >
                                        {i + 1}. {dimension.name}
                                    </h2>
                                    <Heading size={4} class="px-4">{dimension.subtitle}</Heading>
                                    <IDGSymbol
                                        id={dimension.id}
                                        symbols={$symbols}
                                        class="pointer-events-none w-36 h-36 my-4 mx-auto"
                                    />
                                    <p class="p-4 pt-0">{dimension.description}</p>
                                </div>

                                <div class="py-2 sm:p-0 bg-white space-y-2 lg:hidden">
                                    {#each getSkillsInDimension( dimension.id, { skills: $skills }, ) as skill (skill.name)}
                                        <Disclosure class="grid relative" let:open>
                                            <DisclosureButton
                                                class={cx(
                                                    'sticky top-0 p-2 flex gap-2 items-center hover:bg-white hover:text-black text-left group drop-shadow-xl',
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
                                                <h3
                                                    class="text-2xl sm:text-xl md:text-3xl font-bold py-4 break-words hyphens-auto {textColor}"
                                                >
                                                    {skill.name}
                                                </h3>
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

                                <div class="space-y-2 hidden lg:grid">
                                    {#each getSkillsInDimension( dimension.id, { skills: $skills }, ) as skill (skill.name)}
                                        {@const hoverClasses = `hover:bg-white hover:text-black hover:outline hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`}
                                        {@const activeClasses = `bg-white text-black outline outline-${dimensionSlug} outline-1 -outline-offset-1`}
                                        {@const isSelected = $focusedSkill?.id === skill.id}
                                        <div class="relative grid">
                                            <button
                                                class={cx(
                                                    'sticky top-0 p-2 flex gap-2 items-center text-left group drop-shadow-xl',
                                                    hoverClasses,
                                                    bgColor,
                                                    isSelected ? activeClasses : '',
                                                )}
                                                on:click={() => ($selectedSkill = skill.id)}
                                                ><IDGSymbol
                                                    id={skill.id}
                                                    symbols={$symbols}
                                                    class={cx(
                                                        `w-10 h-10 shrink-0 group-hover:!${textColor}`,
                                                        isSelected ? textColor : '',
                                                    )}
                                                />
                                                <p class="text-sm w-full">
                                                    {skill.name}
                                                </p>
                                                <ChevronDown
                                                    class="mx-1 flex-grow -rotate-90"
                                                /></button
                                            >
                                        </div>
                                    {/each}
                                </div>

                                <div class="hidden lg:grid {bgColor}">
                                    <div class="bg-white px-4 grid">
                                        <h3
                                            class="text-2xl sm:text-xl xl:text-2xl font-bold py-4 break-words hyphens-auto {textColor}"
                                        >
                                            {$focusedSkill.name}
                                        </h3>
                                        <div
                                            class={cx(
                                                'rounded-lg flex items-center py-4 justify-center',
                                                bgColor,
                                            )}
                                        >
                                            <IDGSymbol
                                                id={$focusedSkill.id}
                                                symbols={$symbols}
                                                class="pointer-events-none w-36 h-36 text-white"
                                            />
                                        </div>
                                        <p class="py-4 text-black">
                                            {$focusedSkill.description}
                                        </p>
                                    </div>
                                </div>
                            </TabPanel>
                        {/each}
                    </TabPanels>
                </TabGroup>
            </div>
        {/if}
    {/key}
</div>
