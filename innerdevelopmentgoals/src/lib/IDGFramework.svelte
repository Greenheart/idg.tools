<script lang="ts">
    import { Tabs, Accordion } from 'bits-ui'
    import { onMount } from 'svelte'
    import '../app.css'

    // TODO: Ensure the JSON files can be bundled properly.
    // Otherwise, turn this into separate ES modules that can be imported to decide which locales you want to support
    import allLocales from '../content.json'
    import allSymbols from '../symbols.json'
    import type { IDGSymbols, Locale, WidgetContent } from '$shared/types'

    const content = allLocales as Record<Locale, WidgetContent>
    const symbols = allSymbols as IDGSymbols

    // IDEA: Consider redesigning the framework widget to match the PDF presentations
    // For example by only using colors for icons and otherwise black text on white background,
    // which would fix the inaccessible text contrast. This would make the IDG framework much better adapted to a diverse and global audience.

    // IDEA: Set correct `dir` for content based on the locale

    // NOTE: Consider Simplifying the heading
    import Heading from './Heading.svelte'
    import LocaleSelector from './LocaleSelector.svelte'
    import { getSkillsInDimension, getDimensionSlug } from '$shared/content-utils'
    import { IDGSymbol, ChevronDown } from '$shared/icons'
    import { getColor } from '$shared/utils'
    import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'
    import { IDGFrameworkState } from './idg-framework.svelte'

    const widgetState = new IDGFrameworkState(DEFAULT_LOCALE_IDENTIFIER, content)

    // IDEA: See if we can mount the tabs directly by removning the unwanted re-render.
    // This might be caused by strange state updates
    let mounted = $state(false)

    onMount(() => {
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
            <LocaleSelector
                supportedLocales={widgetState.supportedLocales}
                locale={widgetState.locale}
                onChangeLocale={(selected) => (widgetState.locale = selected)}
            />
        </div>

        <Tabs.Root bind:value={widgetState.selectedDimensionId}>
            <Tabs.List class="grid grid-cols-5 text-white">
                {#each widgetState.dimensions as dimension (dimension.id)}
                    {@const dimensionSlug = getDimensionSlug(dimension.id)}
                    {@const isSelected = dimension.id === widgetState.selectedDimensionId}
                    <Tabs.Trigger
                        value={dimension.id}
                        class="xs:px-2 grid place-items-center py-2 {isSelected
                            ? `${getColor(dimension.id)}`
                            : `hover:outline-solid bg-white hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
                    >
                        <IDGSymbol
                            symbolPaths={symbols[dimension.id]}
                            aria-label={dimension.name}
                            class="pointer-events-none size-12 {isSelected
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

            {#each widgetState.dimensions as dimension, i (dimension.id)}
                {@const dimensionSlug = getDimensionSlug(dimension.id)}
                {@const bgColor = getColor(dimension.id, 'bg')}
                {@const textColor = getColor(dimension.id, 'text')}
                {@const dimensionSkills = getSkillsInDimension(dimension.id, {
                    skills: widgetState.skills,
                })}
                <Tabs.Content
                    value={dimension.id}
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
                            class="pointer-events-none mx-auto my-4 size-36"
                        />
                        <p class="p-4 pt-0">{dimension.description}</p>
                    </div>

                    <Accordion.Root
                        class="space-y-2 bg-white py-2 sm:p-0 lg:hidden"
                        type="multiple"
                    >
                        {#each dimensionSkills as skill (skill.id)}
                            <Accordion.Item class="relative grid" value={skill.id}>
                                <Accordion.Header>
                                    <Accordion.Trigger
                                        class={[
                                            'group sticky top-0 flex w-full items-center gap-2 p-2 text-left drop-shadow-xl hover:bg-white hover:text-black',
                                            `hover:outline-solid hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`,
                                            '[&[data-state=open]>svg:last-child]:rotate-180',
                                            bgColor,
                                        ]}
                                        onclick={() => (widgetState.selectedSkillId = skill.id)}
                                    >
                                        <IDGSymbol
                                            symbolPaths={symbols[skill.id]}
                                            aria-label={skill.name}
                                            class="size-10 shrink-0 group-hover:!{textColor}"
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
                                            class="pointer-events-none size-36 text-white"
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
                        {#each dimensionSkills as skill (skill.name)}
                            {@const hoverClasses = `hover:bg-white hover:text-black hover:outline-solid hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`}
                            {@const activeClasses = `bg-white text-black outline-solid outline-${dimensionSlug} outline-1 -outline-offset-1`}
                            {@const isSelected = skill.id === widgetState.selectedSkillId}
                            <div class="relative grid">
                                <button
                                    class={[
                                        'group sticky top-0 flex items-center gap-2 p-2 text-left drop-shadow-xl',
                                        hoverClasses,
                                        bgColor,
                                        isSelected && activeClasses,
                                    ]}
                                    onclick={() => (widgetState.selectedSkillId = skill.id)}
                                    ><IDGSymbol
                                        symbolPaths={symbols[skill.id]}
                                        aria-label={skill.name}
                                        class={[
                                            `size-10 shrink-0 group-hover:!${textColor}`,
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
                                {widgetState.selectedSkill.name}
                            </h3>
                            <div
                                class={[
                                    'flex items-center justify-center rounded-lg py-4',
                                    bgColor,
                                ]}
                            >
                                <IDGSymbol
                                    symbolPaths={symbols[widgetState.selectedSkill.id]}
                                    aria-label={widgetState.selectedSkill.name}
                                    class="pointer-events-none size-36 text-white"
                                />
                            </div>
                            <p class="py-4 text-black">
                                {widgetState.selectedSkill.description}
                            </p>
                        </div>
                    </div>
                </Tabs.Content>
            {/each}
        </Tabs.Root>
    </div>
</div>
