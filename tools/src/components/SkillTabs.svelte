<script lang="ts">
    import { TabGroup, Tab, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { selectedSkills } from '$lib/stores'

    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor, onKeydown } from '$lib/utils'
    import type { Skill, ToolsContent } from '$shared/types'
    import SkillButton from './SkillButton.svelte'
    import Button from '$shared/components/Button.svelte'

    let loaded = false
    onMount(() => {
        loaded = true
    })

    const toggleSkills = (skills: Skill['id'][], alreadySelected: Skill['id'][]) => {
        // Select all if not all skills are yet selected
        if (alreadySelected.length < skills.length) {
            $selectedSkills = [
                ...$selectedSkills,
                ...skills.filter((skillId) => !alreadySelected.includes(skillId)),
            ]
            //  Unselect all if everything is already selected
        } else {
            $selectedSkills = $selectedSkills.filter(
                (skillId) => !alreadySelected.includes(skillId),
            )
        }
    }

    export let content: ToolsContent
    let className = ''
    export { className as class }
</script>

<div class={cx('sticky top-0 z-10 h-[146px] md:h-[131px]', className)}>
    {#if loaded}
        <div class="relative" in:fade>
            <TabGroup
                class="absolute top-0 left-0 right-0 -ml-4 -mr-4 overflow-hidden bg-stone-900 text-stone-50 shadow-2xl sm:-mr-8 sm:-ml-8"
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
                <TabPanels class="skill-tabs grid overflow-x-scroll text-stone-900">
                    {#each content.dimensions as { id: dimensionId, skills } (dimensionId)}
                        {@const color = getColor(dimensionId)}
                        <!-- IDEA: Allow skills to wrap for desktop users, and hide the permanent scrollbar -->
                        <TabPanel class={cx('flex flex-nowrap gap-2 p-4', color)}>
                            {@const alreadySelected = skills.filter((skillId) =>
                                $selectedSkills.includes(skillId),
                            )}
                            <div class="flex justify-start border-r border-stone-900 pr-2">
                                <!-- <Button
                                    variant="inverted"
                                    size="sm"
                                    on:click={() => toggleSkills(skills, alreadySelected)}
                                    on:keydown={onKeydown(() =>
                                        toggleSkills(skills, alreadySelected),
                                    )}
                                    class="whitespace-nowrap"
                                    >{alreadySelected.length < skills.length
                                        ? 'Select all'
                                        : 'Unselect all'}</Button
                                > -->
                                <Button
                                    variant="inverted"
                                    size="sm"
                                    on:click={() => toggleSkills(skills, alreadySelected)}
                                    on:keydown={onKeydown(() =>
                                        toggleSkills(skills, alreadySelected),
                                    )}
                                    class="whitespace-nowrap">Toggle all</Button
                                >
                            </div>
                            {#each getSkillsInDimension(dimensionId, content) as skill (skill.name)}
                                <SkillButton {skill} class="whitespace-nowrap !py-2" />
                            {/each}
                        </TabPanel>
                    {/each}
                </TabPanels>
            </TabGroup>
        </div>
    {/if}
</div>
