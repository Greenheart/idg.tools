<script lang="ts">
    import { Tabs } from 'bits-ui'

    import './widget.css'
    import { allLocales } from './content'
    import allSymbols from './symbols.json'
    import type { Dimension, IDGSymbols, Locale, Skill, WidgetContent } from '$shared/types'

    // TODO: Add types (using local types) in the generated output
    const content = allLocales as Record<Locale, WidgetContent>
    const symbols = allSymbols as IDGSymbols

    import LocaleSelector from './LocaleSelector.svelte'
    import { getSkillsInDimension, getDimensionSlug } from '$shared/content-utils'
    import { IDGFrameworkState } from './idg-framework.svelte'

    const widgetState = new IDGFrameworkState({ content })

    function formatColorVar(id: Dimension['id'] | Skill['id']) {
        return `--color: var(--${getDimensionSlug(id)});`
    }
</script>

{#snippet IDGSymbol({ id, name }: { id: keyof IDGSymbols; name: string })}
    <svg
        class="idg-symbol"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 198.43 198.43"
        aria-label={name}
    >
        {#each symbols[id] as path}
            <path d={path} />
        {/each}
    </svg>
{/snippet}

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
                    {@render IDGSymbol(dimension)}
                    <p>{dimension.name}</p>
                </Tabs.Trigger>
            {/each}
        </Tabs.List>

        {#each widgetState.dimensions as dimension (dimension.id)}
            {@const dimensionSkills = getSkillsInDimension(dimension.id, widgetState.skills)}
            <Tabs.Content value={dimension.id} style={formatColorVar(dimension.id)}>
                <div class="dimension">
                    {@render IDGSymbol(dimension)}
                    <h2>{dimension.name}</h2>
                    <h3>{dimension.subtitle}</h3>
                    <p>{dimension.description}</p>
                </div>

                <div class="skills">
                    {#each dimensionSkills as skill (skill.id)}
                        {@render IDGSymbol(skill)}
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
