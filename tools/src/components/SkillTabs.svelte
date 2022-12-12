<script lang="ts">
    import { TabGroup, Tab, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { selectedSkills, selectedTags } from '$lib/stores'

    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor, onKeydown } from '$lib/utils'
    import type { Skill, ToolsContent } from '$shared/types'
    import SkillButton from './SkillButton.svelte'
    import Button from '$shared/components/Button.svelte'

    let loaded = false
    onMount(() => {
        // setTimeout(() => {
        loaded = true
        // }, 1000)
    })

    const toggleSkills = (skills: Skill['id'][]) => {
        const alreadySelected = skills.filter((skillId) => $selectedSkills.includes(skillId))

        // Select all if not all skills are yet selected
        if (alreadySelected.length < skills.length) {
            $selectedSkills = [
                ...$selectedSkills,
                ...skills.filter((skillId) => !alreadySelected.includes(skillId)),
            ]
        } else {
            // Unselect all if everything is already selected
            $selectedSkills = $selectedSkills.filter(
                (skillId) => !alreadySelected.includes(skillId),
            )
        }
    }

    // NOTE: Unsure why type for mouse event doesn't work
    const scrollIntoView = (event: any) => {
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }

    const resetFilters = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    export let content: ToolsContent
    let className = ''
    export { className as class }
</script>

<div
    class={cx(
        'sticky top-0 z-10 -mr-4 -ml-4 h-[116px] px-4 sm:-mr-8 sm:-ml-8 sm:h-[148px] sm:px-8 md:h-[108px] lg:h-[108px]',
        className,
    )}
>
    <div class="relative h-[116px] sm:h-[148px] md:h-[108px] lg:h-[108px]">
        {#if loaded}
            <div in:fade>
                <TabGroup
                    class="absolute top-0 left-0 right-0 -ml-4 -mr-4 overflow-hidden bg-stone-900 text-stone-50 shadow-2xl sm:-mr-8 sm:-ml-8"
                    on:change={() => document.querySelector('.skill-tabs')?.scrollTo(0, 0)}
                >
                    <TabList class="xs:overflow-auto flex flex-nowrap overflow-x-scroll">
                        {#each content.dimensions as { name, id: dimensionId } (dimensionId)}
                            {@const color = getColor(dimensionId, 'text')}
                            <Tab
                                on:click={scrollIntoView}
                                class={({ selected }) =>
                                    cx(
                                        'py-4 px-2 !text-base first:pl-4 last:pr-4 sm:!text-lg',
                                        selected ? cx(color, 'underline') : 'text-stone-50',
                                    )}>{name}</Tab
                            >
                        {/each}
                    </TabList>
                    <TabPanels class="skill-tabs flex h-full items-start text-stone-900">
                        {#each content.dimensions as { id: dimensionId, skills } (dimensionId)}
                            {@const color = getColor(dimensionId)}
                            <TabPanel
                                class={cx(
                                    'xs:gap-2 flex h-full flex-1 flex-wrap gap-1 overflow-auto p-2',
                                    color,
                                )}
                            >
                                <Button
                                    variant="inverted"
                                    size="sm"
                                    on:click={() => toggleSkills(skills)}
                                    on:keydown={onKeydown(() => toggleSkills(skills))}
                                    class="xs:text-base whitespace-nowrap text-sm font-normal"
                                    >Choose all</Button
                                >
                                {#each getSkillsInDimension(dimensionId, content) as skill (skill.name)}
                                    <SkillButton {skill} class="xs:whitespace-nowrap" />
                                {/each}
                            </TabPanel>
                        {/each}
                    </TabPanels>
                </TabGroup>
            </div>
        {/if}

        <!-- TODO: ensure this is shown in the correct place -->
        <div class="absolute top-56 flex gap-2">
            <!-- TODO: implement advanced filters as modal -->
            <Button variant="unstyled" size="sm" class="font-bold underline"
                >Advanced filters</Button
            >
            <Button variant="unstyled" on:click={resetFilters} size="sm" class="font-bold underline"
                >Reset</Button
            >
        </div>
    </div>
</div>
