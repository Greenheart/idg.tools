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
    import { getColor } from '$shared/utils'
    import type {
        Dimension,
        DimensionSlug,
        IDGSymbols,
        Skill,
        SupportedLocales,
    } from '$shared/types'

    interface Props {
        skills: Readable<Skill[]>
        dimensions: Readable<Dimension[]>
        symbols: Readable<IDGSymbols>
        currentLocale: string
        supportedLocales: SupportedLocales
        pathname: string
        selectedDimension?: Readable<DimensionSlug | undefined> | undefined
    }

    let {
        skills,
        dimensions,
        symbols,
        currentLocale,
        supportedLocales,
        pathname,
        selectedDimension = undefined,
    }: Props = $props()

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

<div class="relative mx-auto min-h-[700px] max-w-screen-xl bg-white">
    {#key $dimensions}
        {#if $dimensions}
            <div class="h-full text-base">
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
                    onchange={(event) => {
                        if (event.detail !== $selectedDimensionIndex) {
                            $selectedDimensionIndex = event.detail
                            $selectedSkill = $dimensions[event.detail].skills[0]
                        }
                    }}
                >
                    <TabList
                        class="grid grid-cols-5 text-white {$selectedDimension ? 'hidden' : ''}"
                    >
                        {#each $dimensions as dimension, i (dimension.name)}
                            {@const dimensionSlug = getDimensionSlug(dimension.id)}
                            {@const isSelected = $selectedDimensionIndex === i}
                            <Tab
                                class="xs:px-2 grid place-items-center py-2 {isSelected
                                    ? `${getColor(dimension.id)}`
                                    : `bg-white hover:outline hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
                            >
                                <IDGSymbol
                                    id={dimension.id}
                                    symbols={$symbols}
                                    class="pointer-events-none h-12 w-12 {isSelected
                                        ? 'text-white'
                                        : getColor(dimension.id, 'text')}"
                                />
                                <p
                                    class="hidden pt-2 text-sm font-medium sm:block md:text-base {isSelected
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
                                class="grid w-full items-start bg-white text-white sm:grid-cols-[minmax(260px,1fr)_2fr] sm:gap-2 sm:pt-2 lg:grid-cols-[minmax(260px,1fr)_1fr_1fr]"
                            >
                                <div class="sm:sticky sm:top-0 {bgColor}">
                                    <h2
                                        class="hyphens-auto break-words p-4 pb-1 text-2xl font-bold md:text-3xl"
                                    >
                                        {i + 1}. {dimension.name}
                                    </h2>
                                    <Heading size={4} class="px-4">{dimension.subtitle}</Heading>
                                    <IDGSymbol
                                        id={dimension.id}
                                        symbols={$symbols}
                                        class="pointer-events-none mx-auto my-4 h-36 w-36"
                                    />
                                    <p class="p-4 pt-0">{dimension.description}</p>
                                </div>

                                <div class="space-y-2 bg-white py-2 sm:p-0 lg:hidden">
                                    {#each getSkillsInDimension( dimension.id, { skills: $skills }, ) as skill (skill.name)}
                                        <Disclosure class="relative grid">
                                            {#snippet children({ open })}
                                                <DisclosureButton
                                                    class={[
                                                        'group sticky top-0 flex items-center gap-2 p-2 text-left drop-shadow-xl hover:bg-white hover:text-black',
                                                        `hover:outline hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`,
                                                        bgColor,
                                                    ]}
                                                >
                                                    <IDGSymbol
                                                        id={skill.id}
                                                        symbols={$symbols}
                                                        class="h-10 w-10 shrink-0 group-hover:!{textColor}"
                                                    />
                                                    <p class="w-full text-sm">
                                                        {skill.name}
                                                    </p>
                                                    <ChevronDown
                                                        class={[
                                                            'mx-1 flex-grow',
                                                            open ? 'rotate-180' : 'rotate-0',
                                                        ]}
                                                    />
                                                </DisclosureButton>
                                                <DisclosurePanel
                                                    class="grid bg-white px-4 sm:bg-transparent"
                                                >
                                                    <h3
                                                        class="hyphens-auto break-words py-4 text-2xl font-bold sm:text-xl md:text-3xl {textColor}"
                                                    >
                                                        {skill.name}
                                                    </h3>
                                                    <div
                                                        class={[
                                                            'flex items-center justify-center rounded-lg py-4',
                                                            bgColor,
                                                        ]}
                                                    >
                                                        <IDGSymbol
                                                            id={skill.id}
                                                            symbols={$symbols}
                                                            class="pointer-events-none h-36 w-36 text-white"
                                                        />
                                                    </div>
                                                    <p class="py-4 text-black">
                                                        {skill.description}
                                                    </p>
                                                </DisclosurePanel>
                                            {/snippet}
                                        </Disclosure>
                                    {/each}
                                </div>

                                <div class="hidden space-y-2 lg:grid">
                                    {#each getSkillsInDimension( dimension.id, { skills: $skills }, ) as skill (skill.name)}
                                        {@const hoverClasses = `hover:bg-white hover:text-black hover:outline hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`}
                                        {@const activeClasses = `bg-white text-black outline outline-${dimensionSlug} outline-1 -outline-offset-1`}
                                        {@const isSelected = $focusedSkill?.id === skill.id}
                                        <div class="relative grid">
                                            <button
                                                class={[
                                                    'group sticky top-0 flex items-center gap-2 p-2 text-left drop-shadow-xl',
                                                    hoverClasses,
                                                    bgColor,
                                                    isSelected ? activeClasses : '',
                                                ]}
                                                onclick={() => ($selectedSkill = skill.id)}
                                                ><IDGSymbol
                                                    id={skill.id}
                                                    symbols={$symbols}
                                                    class={[
                                                        `h-10 w-10 shrink-0 group-hover:!${textColor}`,
                                                        isSelected ? textColor : '',
                                                    ]}
                                                />
                                                <p class="w-full text-sm">
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
                                    <div class="grid bg-white px-4">
                                        <h3
                                            class="hyphens-auto break-words py-4 text-2xl font-bold sm:text-xl xl:text-2xl {textColor}"
                                        >
                                            {$focusedSkill.name}
                                        </h3>
                                        <div
                                            class={[
                                                'flex items-center justify-center rounded-lg py-4',
                                                bgColor,
                                            ]}
                                        >
                                            <IDGSymbol
                                                id={$focusedSkill.id}
                                                symbols={$symbols}
                                                class="pointer-events-none h-36 w-36 text-white"
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
