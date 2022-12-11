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

    const resetFilters = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    export let content: ToolsContent
    let className = ''
    export { className as class }
</script>

<!-- TODO: ensure this is shown in the correct place -->
<div class="relative hidden h-[131px] sm:h-[148px] md:h-[116px] lg:h-[108px]">
    <div class="absolute -bottom-16 flex gap-2">
        <!-- TODO: implement advanced filters as modal -->
        <Button variant="unstyled" size="sm" class="font-bold underline">Advanced filters</Button>
        <Button variant="unstyled" on:click={resetFilters} size="sm" class="font-bold underline"
            >Reset</Button
        >
    </div>
</div>

<!-- IDEA: Maybe wrap and show all skills even on mobile and remove the horizontal scroll for skills -->

<!-- TODO: Maybe we need to do something about the loading state to show relevant UI even before the TabGroup is ready? -->
<div
    class={cx(
        'sticky top-0 z-10 -mr-4 -ml-4 h-[131px] bg-stone-900 px-4 sm:-mr-8 sm:-ml-8 sm:h-[148px] sm:px-8 md:h-[108px] lg:h-[108px]',
        className,
    )}
>
    <div class="relative h-full">
        {#if loaded}
            <div in:fade class="h-full">
                <TabGroup
                    class="absolute top-0 left-0 right-0 -ml-4 -mr-4 grid h-full grid-rows-[min-content_1fr] overflow-hidden bg-stone-900 text-stone-50 shadow-2xl sm:-mr-8 sm:-ml-8"
                    on:change={() => document.querySelector('.skill-tabs')?.scrollTo(0, 0)}
                >
                    <TabList class="xs:overflow-auto flex flex-nowrap overflow-x-scroll">
                        {#each content.dimensions as { name, id: dimensionId } (dimensionId)}
                            {@const color = getColor(dimensionId, 'text')}
                            <Tab
                                class={({ selected }) =>
                                    cx(
                                        'py-4 px-2 text-lg first:pl-4 last:pr-4',
                                        selected ? cx(color, 'underline') : 'text-stone-50',
                                    )}>{name}</Tab
                            >
                        {/each}
                    </TabList>
                    <TabPanels
                        class="skill-tabs xs:overflow-x-auto overflow-x-scroll text-stone-900"
                    >
                        {#each content.dimensions as { id: dimensionId, skills } (dimensionId)}
                            {@const color = getColor(dimensionId)}
                            <!-- IDEA: Allow skills to wrap for desktop users, and hide the permanent scrollbar -->
                            <TabPanel
                                class={cx(
                                    'flex h-full flex-nowrap items-start gap-2 p-2 sm:flex-wrap',
                                    color,
                                )}
                            >
                                <div class="flex justify-start border-r border-stone-900 pr-2">
                                    <Button
                                        variant="inverted"
                                        size="sm"
                                        on:click={() => toggleSkills(skills)}
                                        on:keydown={onKeydown(() => toggleSkills(skills))}
                                        class="whitespace-nowrap">Toggle all</Button
                                    >
                                </div>
                                {#each getSkillsInDimension(dimensionId, content) as skill (skill.name)}
                                    <SkillButton {skill} class="whitespace-nowrap !py-2 sm:!py-1" />
                                {/each}
                            </TabPanel>
                        {/each}
                    </TabPanels>
                </TabGroup>
            </div>
            <!-- {:else}
            <div
                class="absolute top-0 left-0 right-0 -ml-4 -mr-4 h-[131px] bg-stone-900 shadow-2xl sm:-mr-8 sm:-ml-8 sm:h-[148px] lg:h-[108px]"
            /> -->
        {/if}
    </div>
</div>
