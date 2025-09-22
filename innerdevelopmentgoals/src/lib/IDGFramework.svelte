<script lang="ts" module>
    import './widget.css'
    import { locales } from './content'
    import { symbols } from './symbols'
    import { COLORS } from './constants'
    import type { Dimension, IDGFrameworkProps, IDGSymbols, Skill, WidgetContent } from './types'

    function getDimensionSlug(id: Dimension['id'] | Skill['id']) {
        return COLORS[id]
    }

    function formatColorVar(id: Dimension['id'] | Skill['id']) {
        return `--color: var(--${getDimensionSlug(id)});`
    }

    function getSkillsInDimension(id: Dimension['id'], skills: WidgetContent['skills']) {
        return skills.filter((s) => s.dimension === id)
    }
</script>

<script lang="ts">
    import { Tabs } from 'bits-ui'

    import LocaleSelector from './LocaleSelector.svelte'
    import { IDGFrameworkState } from './idg-framework.svelte'

    let { defaultLocale, persistLocale = true }: IDGFrameworkProps = $props()

    const widgetState = new IDGFrameworkState({ defaultLocale, locales, persistLocale })
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
