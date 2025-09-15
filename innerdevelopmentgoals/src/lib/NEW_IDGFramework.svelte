<script lang="ts">
    import { Tabs } from 'bits-ui'

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
</script>

<div class="max-w-(--breakpoint-xl) relative mx-auto min-h-[700px] bg-white">
    <div class="h-full text-base">
        <div class="flex justify-end p-2">
            <LocaleSelector
                supportedLocales={widgetState.supportedLocales}
                locale={widgetState.locale}
                onChangeLocale={(selected) => (widgetState.locale = selected)}
            />
        </div>

        <!-- TODO: improve styling -->
        <!-- TODO: Make it work well for all locales -->
        <!-- Create build process -->
        <!-- Create demo page -->

        <Tabs.Root bind:value={widgetState.selectedDimensionId}>
            <Tabs.List class="grid grid-cols-5 gap-0.5 text-white sm:gap-1">
                {#each widgetState.dimensions as dimension (dimension.id)}
                    {@const isSelected = dimension.id === widgetState.selectedDimensionId}
                    <Tabs.Trigger
                        value={dimension.id}
                        class="xs:px-2 grid place-items-center rounded-lg py-2 {isSelected
                            ? `${getColor(dimension.id)}`
                            : `hover:outline-solid bg-white hover:outline-1 hover:outline-${getDimensionSlug(dimension.id)} hover:-outline-offset-1`}"
                        title={dimension.name}
                    >
                        <IDGSymbol
                            symbolPaths={symbols[dimension.id]}
                            aria-label={dimension.name}
                            class={[
                                'pointer-events-none size-12',
                                !isSelected && getColor(dimension.id, 'text'),
                            ]}
                        />
                        <p
                            class={[
                                'hidden pt-2 text-sm font-medium sm:block md:text-base',
                                !isSelected && 'text-black',
                            ]}
                        >
                            {dimension.name}
                        </p>
                    </Tabs.Trigger>
                {/each}
            </Tabs.List>

            {#each widgetState.dimensions as dimension (dimension.id)}
                {@const textColor = getColor(dimension.id, 'text')}
                {@const dimensionSkills = getSkillsInDimension(dimension.id, {
                    skills: widgetState.skills,
                })}
                <!-- <Tabs.Content
                    value={dimension.id}
                    class="grid w-full items-start gap-8 bg-white px-4 text-black sm:pt-2 md:grid-cols-[minmax(320px,1fr)_2fr] md:px-8"
                > -->
                <!-- TODO: Make columns consistent widths - test with Thinking for zh-TW -->
                <!--
                    NOTE: Maybe use the same grid as before and bump the max width the first column for larger screens
                    This would allow larger fonts while still keeping a narrow layout on mid-sized screens
                -->
                <!-- NOTE: Maybe reduce the font size, but ideally change grid column width instead -->
                <Tabs.Content
                    value={dimension.id}
                    class="xs:px-8 flex flex-col items-start gap-8 px-4 text-black sm:pt-2 md:flex-row md:justify-between md:px-4 lg:px-8"
                >
                    <div class="max-w-full text-balance pt-6 md:max-w-sm lg:max-w-lg">
                        <IDGSymbol
                            symbolPaths={symbols[dimension.id]}
                            aria-label={dimension.name}
                            class={['pointer-events-none -ml-1 size-36', textColor]}
                        />
                        <h2
                            class="xs:text-4xl hyphens-auto break-words pt-4 text-3xl font-bold lg:text-5xl xl:text-6xl"
                        >
                            {dimension.name}
                        </h2>
                        <h3 class="pt-1 text-lg font-semibold sm:pt-2 sm:text-2xl lg:text-3xl">
                            {dimension.subtitle}
                        </h3>
                        <p class="pt-8">{dimension.description}</p>
                    </div>

                    <div
                        class="xs:gap-x-8 grid gap-4 text-balance sm:grid-cols-[max-content_1fr] sm:gap-y-8 sm:pt-4"
                    >
                        {#each dimensionSkills as skill (skill.id)}
                            <IDGSymbol
                                symbolPaths={symbols[skill.id]}
                                aria-label={skill.name}
                                class={[
                                    'pointer-events-none mt-4 size-20 shrink-0 self-center sm:m-0',
                                    textColor,
                                ]}
                            />
                            <div>
                                <h2 class="font-bold">{skill.name}</h2>
                                <p>{skill.description}</p>
                            </div>
                        {/each}
                    </div>
                </Tabs.Content>
            {/each}
        </Tabs.Root>
    </div>
</div>
