<script lang="ts">
    import { TabGroup, Tab, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui'
    import { onMount } from 'svelte'
    import { fade } from 'svelte/transition'

    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor } from '$lib/utils'
    import type { ToolsContent } from '$shared/types'
    import SkillButton from './SkillButton.svelte'

    let loaded = false
    onMount(() => {
        loaded = true
    })

    export let content: ToolsContent
    let className = ''
    export { className as class }
</script>

<div class={cx('sticky top-0 z-10 h-[146px] md:h-[131px]', className)}>
    {#if loaded}
        <div class="relative" in:fade>
            <TabGroup
                class="absolute top-0 left-0 right-0 -ml-4 -mr-4 overflow-hidden bg-stone-900 text-stone-50 shadow-2xl"
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
                    {#each content.dimensions as { id: dimensionId } (dimensionId)}
                        {@const color = getColor(dimensionId)}
                        <TabPanel class={cx('flex flex-nowrap gap-2 p-4', color)}>
                            {#each getSkillsInDimension(dimensionId, content) as skill (skill.name)}
                                <SkillButton
                                    {skill}
                                    class="!transform-none whitespace-nowrap py-2"
                                />
                            {/each}
                        </TabPanel>
                    {/each}
                </TabPanels>
            </TabGroup>
        </div>
    {/if}
</div>
