<script lang="ts">
    import { Tabs, Accordion } from 'bits-ui'
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'

    // IDEA: Consider redesigning the framework widget to match the PDF presentations
    // For example by only using colors for icons and otherwise black text on white background,
    // which would fix the inaccessible text contrast. This would make the IDG framework much better adapted to a diverse and global audience.

    // TODO: Set correct `dir` for content based on the locale

    import Heading from '$shared/components/Heading.svelte'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import {
        getSkillsInDimension,
        getDimensionSlug,
        getSkill,
        getDimensionBySlug,
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
    import { onMount } from 'svelte'

    interface Props {
        skills: Skill[]
        dimensions: Dimension[]
        symbols: IDGSymbols
        currentLocale: string
        supportedLocales: SupportedLocales
        pathname: string
        /**
         * Can be used to lock the framework to only display one specific dimension. Useful for embeds.
         */
        lockedDimension?: DimensionSlug | undefined
    }

    let {
        skills,
        dimensions,
        symbols,
        currentLocale,
        supportedLocales,
        pathname,
        lockedDimension,
    }: Props = $props()

    let selectedDimensionSlug = $state(lockedDimension ?? getDimensionSlug(dimensions[0].id))

    const selectedDimension = $derived(getDimensionBySlug(selectedDimensionSlug, { dimensions }))

    /**
     * Select the first skill by default, or as soon as the dimension changes
     * Even though this is a derived value, it can also be overwritten by selecting other skills within the dimension
     */
    let selectedSkill = $derived<Skill>(getSkill(selectedDimension.skills[0], { skills }))
    let mounted = $state(false)

    onMount(async () => {
        // HACK: Render the actual tab if we have lockedDimensions, which are
        // parsed from the URL hash on the client side. This causes a state
        // mismatch between the SSR Tabs and the CSR Tabs.
        // This workaround ensures the desired tab is shown correctly even when the dimension is locked
        // NOTE: This could be a bug in bits-ui. Tabs content becomes blank when Tabs.Root value is different during SSR and set during CSR.
        if (lockedDimension) {
            const desiredTab = document.querySelector(
                `[data-tabs-content][data-value='${selectedDimensionSlug}']`,
            ) as HTMLDivElement
            desiredTab.removeAttribute('hidden')
            desiredTab.dataset.state = 'active'
        }
        mounted = true
    })
</script>

<div
    class={[
        'max-w-(--breakpoint-xl) relative mx-auto min-h-[700px] bg-white',
        !mounted && 'invisible',
    ]}
>
    <div class="h-full text-base">
        <div class="flex justify-end p-2">
            <LocaleSwitcher
                {supportedLocales}
                pathname={lockedDimension ? `${pathname}#${lockedDimension}` : pathname}
                {currentLocale}
                {goto}
                {browser}
            />
        </div>

        <Tabs.Root bind:value={selectedDimensionSlug}>
            <Tabs.List class={['grid grid-cols-5 text-white', lockedDimension && 'hidden']}>
                {#each dimensions as dimension (dimension.id)}
                    {@const dimensionSlug = getDimensionSlug(dimension.id)}
                    {@const isSelected = dimension.id === selectedDimension.id}
                    <Tabs.Trigger
                        value={dimensionSlug}
                        class="xs:px-2 grid place-items-center py-2 {isSelected
                            ? `${getColor(dimension.id)}`
                            : `hover:outline-solid bg-white hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
                        title={dimension.name}
                    >
                        <IDGSymbol
                            symbolPaths={symbols[dimension.id]}
                            aria-label={dimension.name}
                            class="pointer-events-none h-12 w-12 {isSelected
                                ? 'text-white'
                                : getColor(dimension.id, 'text')}"
                        />
                        <p
                            class={[
                                'hidden pt-2 text-sm font-medium sm:block md:text-base',
                                isSelected ? 'text-white' : 'text-black',
                            ]}
                        >
                            {dimension.name}
                        </p>
                    </Tabs.Trigger>
                {/each}
            </Tabs.List>

            {#each dimensions as dimension, i (dimension.id)}
                {@const dimensionSlug = getDimensionSlug(dimension.id)}
                {@const bgColor = getColor(dimension.id, 'bg')}
                {@const textColor = getColor(dimension.id, 'text')}
                <Tabs.Content
                    value={dimensionSlug}
                    class={'grid w-full items-start bg-white text-white sm:grid-cols-[minmax(260px,1fr)_2fr] sm:gap-2 sm:pt-2 lg:grid-cols-[minmax(260px,1fr)_1fr_1fr]'}
                >
                    <div class="sm:sticky sm:top-0 {bgColor}">
                        <h2
                            class="hyphens-auto break-words p-4 pb-1 text-2xl font-bold md:text-3xl"
                        >
                            {i + 1}. {dimension.name}
                        </h2>
                        <Heading size={4} class="px-4">{dimension.subtitle}</Heading>
                        <IDGSymbol
                            symbolPaths={symbols[dimension.id]}
                            aria-label={dimension.name}
                            class="pointer-events-none mx-auto my-4 h-36 w-36"
                        />
                        <p class="p-4 pt-0">{dimension.description}</p>
                    </div>

                    <Accordion.Root
                        class="space-y-2 bg-white py-2 sm:p-0 lg:hidden"
                        type="multiple"
                    >
                        {#each getSkillsInDimension(dimension.id, skills) as skill (skill.id)}
                            <Accordion.Item class="relative grid" value={skill.id}>
                                <Accordion.Header>
                                    <Accordion.Trigger
                                        class={[
                                            'group sticky top-0 flex w-full items-center gap-2 p-2 text-left drop-shadow-xl hover:bg-white hover:text-black',
                                            `hover:outline-solid hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`,
                                            '[&[data-state=open]>svg:last-child]:rotate-180',
                                            bgColor,
                                        ]}
                                    >
                                        <IDGSymbol
                                            symbolPaths={symbols[skill.id]}
                                            aria-label={skill.name}
                                            class="h-10 w-10 shrink-0 group-hover:!{textColor}"
                                        />
                                        <p class="w-full text-balance text-sm">
                                            {skill.name}
                                        </p>
                                        <ChevronDown
                                            class="transition-gpu mx-1 grow transition-transform duration-200"
                                        />
                                    </Accordion.Trigger>
                                </Accordion.Header>
                                <Accordion.Content class="grid bg-white px-4 sm:bg-transparent">
                                    <h3
                                        class={[
                                            'hyphens-auto break-words py-4 text-2xl font-bold sm:text-xl md:text-3xl',
                                            textColor,
                                        ]}
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
                                            symbolPaths={symbols[skill.id]}
                                            aria-label={skill.name}
                                            class="pointer-events-none h-36 w-36 text-white"
                                        />
                                    </div>
                                    <p class="py-4 text-black">
                                        {skill.description}
                                    </p>
                                </Accordion.Content>
                            </Accordion.Item>
                        {/each}
                    </Accordion.Root>

                    <div class="hidden space-y-2 lg:grid">
                        {#each getSkillsInDimension(dimension.id, skills) as skill (skill.id)}
                            {@const hoverClasses = `hover:bg-white hover:text-black hover:outline-solid hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`}
                            {@const activeClasses = `bg-white text-black outline-solid outline-${dimensionSlug} outline-1 -outline-offset-1`}
                            {@const isSelected = selectedSkill?.id === skill.id}
                            <div class="relative grid">
                                <button
                                    class={[
                                        'group sticky top-0 flex items-center gap-2 p-2 text-left drop-shadow-xl',
                                        hoverClasses,
                                        bgColor,
                                        isSelected && activeClasses,
                                    ]}
                                    onclick={() => (selectedSkill = skill)}
                                    ><IDGSymbol
                                        symbolPaths={symbols[skill.id]}
                                        aria-label={skill.name}
                                        class={[
                                            `h-10 w-10 shrink-0 group-hover:!${textColor}`,
                                            isSelected && textColor,
                                        ]}
                                    />
                                    <p class="w-full text-sm">
                                        {skill.name}
                                    </p>
                                    <ChevronDown class="mx-1 grow -rotate-90" /></button
                                >
                            </div>
                        {/each}
                    </div>

                    <div class={['hidden lg:grid', bgColor]}>
                        <div class="grid bg-white px-4">
                            <h3
                                class={[
                                    'hyphens-auto break-words py-4 text-2xl font-bold sm:text-xl xl:text-2xl',
                                    textColor,
                                ]}
                            >
                                {selectedSkill.name}
                            </h3>
                            <div
                                class={[
                                    'flex items-center justify-center rounded-lg py-4',
                                    bgColor,
                                ]}
                            >
                                <IDGSymbol
                                    symbolPaths={symbols[selectedSkill.id]}
                                    aria-label={selectedSkill.name}
                                    class="pointer-events-none h-36 w-36 text-white"
                                />
                            </div>
                            <p class="py-4 text-black">
                                {selectedSkill.description}
                            </p>
                        </div>
                    </div>
                </Tabs.Content>
            {/each}
        </Tabs.Root>
    </div>
</div>
