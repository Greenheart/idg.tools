<script lang="ts">
    import { Tabs } from 'bits-ui'
    import { onMount } from 'svelte'

    import './style.css'
    // import allLocales from './content.json'
    import allSymbols from './symbols.json'
    import type { IDGSymbols, Locale, WidgetContent } from '$shared/types'

    // const content = allLocales as Record<Locale, WidgetContent>
    const symbols = allSymbols as IDGSymbols

    // IDEA: Consider redesigning the framework widget to match the PDF presentations
    // For example by only using colors for icons and otherwise black text on white background,
    // which would fix the inaccessible text contrast. This would make the IDG framework much better adapted to a diverse and global audience.

    // IDEA: Set correct `dir` for content based on the locale

    // TODO: Create minimal CSS to be bundled together with the components
    import LocaleSelector from './LocaleSelector.svelte'
    import { getSkillsInDimension, getDimensionSlug } from '$shared/content-utils'
    import IDGSymbol from './icons/IDGSymbol.svelte'
    import { getColor } from '$shared/utils'
    import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'
    import { IDGFrameworkState } from './idg-framework.svelte'

    type Props = {
        widgetState: IDGFrameworkState
    }
    let { widgetState }: Props = $props()

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
                    {@const isSelected = dimension.id === widgetState.selectedDimensionId}
                    <Tabs.Trigger
                        value={dimension.id}
                        class="xs:px-2 grid place-items-center py-2 {isSelected
                            ? `${getColor(dimension.id)}`
                            : `hover:outline-solid bg-white hover:outline-1 hover:outline-${getDimensionSlug(dimension.id)} hover:-outline-offset-1`}"
                        title={dimension.name}
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

            {#each widgetState.dimensions as dimension (dimension.id)}
                {@const dimensionSlug = getDimensionSlug(dimension.id)}
                {@const bgColor = getColor(dimension.id, 'bg')}
                {@const textColor = getColor(dimension.id, 'text')}
                {@const dimensionSkills = getSkillsInDimension(dimension.id, {
                    skills: widgetState.skills,
                })}
                <Tabs.Content
                    value={dimension.id}
                    class="grid w-full items-start bg-white px-4 text-black sm:grid-cols-[minmax(320px,1fr)_2fr] sm:gap-2 sm:pt-2 md:px-8"
                >
                    <!-- IDEA: Make text larger for mobile screens -->
                    <div class="pt-6 sm:sticky sm:top-0">
                        <IDGSymbol
                            symbolPaths={symbols[dimension.id]}
                            aria-label={dimension.name}
                            class={['pointer-events-none size-36', textColor]}
                        />
                        <h2 class="hyphens-auto break-words pt-4 text-4xl font-bold md:text-5xl">
                            {dimension.name}
                        </h2>
                        <h3 class="md:text:xl text-balance pt-1 text-lg font-semibold">
                            {dimension.subtitle}
                        </h3>
                        <p class="pt-8">{dimension.description}</p>
                    </div>

                    <!-- TODO: List skills below in a wrapper div -->
                    <!-- TODO: For tablet and desktop, show skills to the right of the dimension description -->
                </Tabs.Content>
            {/each}
        </Tabs.Root>
    </div>
</div>
