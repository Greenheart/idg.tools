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
    <LocaleSelector
        supportedLocales={widgetState.supportedLocales}
        locale={widgetState.locale}
        onChangeLocale={(selected) => (widgetState.locale = selected)}
    />

    <!-- Create build process -->
    <!-- Create demo page -->

    <Tabs.Root bind:value={widgetState.selectedDimensionId}>
        <Tabs.List>
            {#each widgetState.dimensions as dimension (dimension.id)}
                <Tabs.Trigger
                    value={dimension.id}
                    title={dimension.name}
                    style={formatColorVar(dimension.id)}
                >
                    <IDGSymbol symbolPaths={symbols[dimension.id]} aria-label={dimension.name} />
                    <p>{dimension.name}</p>
                </Tabs.Trigger>
            {/each}
        </Tabs.List>

        {#each widgetState.dimensions as dimension (dimension.id)}
            {@const dimensionSkills = getSkillsInDimension(dimension.id, widgetState.skills)}
            <Tabs.Content value={dimension.id} style={formatColorVar(dimension.id)}>
                <div class="dimension">
                    <IDGSymbol symbolPaths={symbols[dimension.id]} aria-label={dimension.name} />
                    <h2>{dimension.name}</h2>
                    <h3>{dimension.subtitle}</h3>
                    <p>{dimension.description}</p>
                </div>

                <div class="skills">
                    {#each dimensionSkills as skill (skill.id)}
                        <IDGSymbol symbolPaths={symbols[skill.id]} aria-label={skill.name} />
                        <div>
                            <h2>{skill.name}</h2>
                            <p>{skill.description}</p>
                        </div>
                    {/each}
                </div>
            </Tabs.Content>
        {/each}
    </Tabs.Root>
</div>
