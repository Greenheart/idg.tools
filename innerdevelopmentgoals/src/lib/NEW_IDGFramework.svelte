<script lang="ts">
    import { Tabs } from 'bits-ui'

    import './style.css'
    import './widget.css'
    // import allLocales from './content.json'
    import allSymbols from './symbols.json'
    import type { Dimension, IDGSymbols, Locale, Skill, WidgetContent } from '$shared/types'

    // const content = allLocales as Record<Locale, WidgetContent>
    const symbols = allSymbols as IDGSymbols

    // TODO: Create minimal CSS to be bundled together with the components
    import LocaleSelector from './LocaleSelector.svelte'
    import { getSkillsInDimension, getDimensionSlug } from '$shared/content-utils'
    import IDGSymbol from './icons/IDGSymbol.svelte'
    import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'
    import type { IDGFrameworkState } from './idg-framework.svelte'

    type Props = {
        widgetState: IDGFrameworkState
    }
    let { widgetState }: Props = $props()

    function formatColorVar(id: Dimension['id'] | Skill['id']) {
        return `--color: var(--${getDimensionSlug(id)});`
    }
</script>

<div class="idg-framework">
    <div class="locale">
        <LocaleSelector
            supportedLocales={widgetState.supportedLocales}
            locale={widgetState.locale}
            onChangeLocale={(selected) => (widgetState.locale = selected)}
        />
    </div>

    <!-- Create build process -->
    <!-- Create demo page -->

    <Tabs.Root bind:value={widgetState.selectedDimensionId}>
        <Tabs.List class="tabs-list">
            {#each widgetState.dimensions as dimension (dimension.id)}
                <Tabs.Trigger
                    value={dimension.id}
                    title={dimension.name}
                    style={formatColorVar(dimension.id)}
                >
                    <IDGSymbol symbolPaths={symbols[dimension.id]} aria-label={dimension.name} />
                    <p>
                        {dimension.name}
                    </p>
                </Tabs.Trigger>
            {/each}
        </Tabs.List>

        {#each widgetState.dimensions as dimension (dimension.id)}
            {@const dimensionSkills = getSkillsInDimension(dimension.id, widgetState.skills)}
            <Tabs.Content value={dimension.id} style={formatColorVar(dimension.id)}>
                <div>
                    <IDGSymbol symbolPaths={symbols[dimension.id]} aria-label={dimension.name} />
                    <h2
                        class="xs:text-4xl hyphens-auto break-words pt-4 text-3xl font-bold lg:text-5xl xl:text-6xl"
                    >
                        {dimension.name}
                    </h2>
                    <h3 class="pt-1 text-lg font-semibold sm:pt-2 sm:text-2xl lg:text-3xl">
                        {dimension.subtitle}
                    </h3>
                    <p class="max-w-lg pt-8">{dimension.description}</p>
                </div>

                <div
                    class="xs:gap-x-8 grid gap-4 text-balance sm:grid-cols-[max-content_1fr] sm:gap-y-8"
                >
                    {#each dimensionSkills as skill (skill.id)}
                        <IDGSymbol symbolPaths={symbols[skill.id]} aria-label={skill.name} />
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
