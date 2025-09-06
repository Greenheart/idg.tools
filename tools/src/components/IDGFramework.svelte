<script lang="ts">
    import { Tabs, Accordion } from 'bits-ui'
    import { IsMounted } from 'runed'

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

    let mounted = new IsMounted()

    let {
        skills,
        dimensions,
        symbols,
        currentLocale,
        supportedLocales,
        pathname,
        lockedDimension = undefined,
    }: Props = $props()

    // Keep the same selected dimension and skill when the locale changes
    let selectedDimensionIndex = $state(
        lockedDimension ? getDimensionIndexBySlug(lockedDimension) : 0,
    )
    let selectedSkill = $state<Skill['id'] | null>(null)

    /** The actual currently selected skill */
    const focusedSkill = $derived.by(() => {
        const id = selectedSkill ?? dimensions[selectedDimensionIndex].skills[0]

        return getSkill(id, { skills })
    })

    // IDEA: Maybe render SVG sprites to reduce duplicated DOM-nodes and ship smaller output HTML to the browser?
    // https://tomhazledine.com/inline-svg-icon-sprites/
    // If we define all SVG symbols in one place, we could then reference them later on.
    // Look into how unplugin-icon handles custom icons. Maybe they have a solution for this?

    // TODO: Set correct `dir` for content based on the locale
</script>

<div
    class={[
        'max-w-(--breakpoint-xl) relative mx-auto min-h-[700px] bg-white',
        !mounted.current && 'invisible',
    ]}
>
    <div class="h-full text-base">
        <div class="flex justify-end p-2">
            <!-- TODO: improve sorting for locales. Make it easier to find common languages. See how others have solved this problem. -->
            <LocaleSwitcher
                {supportedLocales}
                pathname={lockedDimension ? `${pathname}#${lockedDimension}` : pathname}
                {currentLocale}
            />
        </div>

        <Tabs.Root
            value={lockedDimension ?? getDimensionSlug(dimensions[selectedDimensionIndex].id)}
            onValueChange={(slug) => {
                const index = getDimensionIndexBySlug(slug as DimensionSlug)!
                if (index !== selectedDimensionIndex) {
                    selectedDimensionIndex = index
                    selectedSkill = dimensions[index].skills[0]
                }
            }}
        >
            <Tabs.List class={['grid grid-cols-5 text-white', lockedDimension && 'hidden']}>
                {#each dimensions as dimension, i (dimension.name)}
                    {@const dimensionSlug = getDimensionSlug(dimension.id)}
                    {@const isSelected = selectedDimensionIndex === i}
                    <Tabs.Trigger
                        value={dimensionSlug}
                        class="xs:px-2 grid place-items-center py-2 {isSelected
                            ? `${getColor(dimension.id)}`
                            : `hover:outline-solid bg-white hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
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

            {#each dimensions as dimension, i (dimension.name)}
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
                        {#each getSkillsInDimension( dimension.id, { skills: skills }, ) as skill (skill.name)}
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
                        {#each getSkillsInDimension(dimension.id, { skills }) as skill (skill.name)}
                            {@const hoverClasses = `hover:bg-white hover:text-black hover:outline-solid hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`}
                            {@const activeClasses = `bg-white text-black outline-solid outline-${dimensionSlug} outline-1 -outline-offset-1`}
                            {@const isSelected = focusedSkill?.id === skill.id}
                            <div class="relative grid">
                                <button
                                    class={[
                                        'group sticky top-0 flex items-center gap-2 p-2 text-left drop-shadow-xl',
                                        hoverClasses,
                                        bgColor,
                                        isSelected && activeClasses,
                                    ]}
                                    onclick={() => (selectedSkill = skill.id)}
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
                                {focusedSkill.name}
                            </h3>
                            <div
                                class={[
                                    'flex items-center justify-center rounded-lg py-4',
                                    bgColor,
                                ]}
                            >
                                <IDGSymbol
                                    symbolPaths={symbols[focusedSkill.id]}
                                    aria-label={focusedSkill.name}
                                    class="pointer-events-none h-36 w-36 text-white"
                                />
                            </div>
                            <p class="py-4 text-black">
                                {focusedSkill.description}
                            </p>
                        </div>
                    </div>
                </Tabs.Content>
            {/each}
        </Tabs.Root>
    </div>
</div>
