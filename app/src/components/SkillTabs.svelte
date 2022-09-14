<script lang="ts">
    import {
        TabGroup,
        Tab,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'

    import { getSkillsInCategory } from '$shared/content-utils'
    import { cx, getColor } from '$lib/utils'
    import type { Content } from '$shared/types'
    import SkillButton from './SkillButton.svelte'

    export let content: Content
    let className = ''
    export { className as class }
</script>

<!-- TODO: Make this take up the full width of the screen -->
<TabGroup
    class={cx(
        'overflow-hidden text-stone-900 sticky top-0 z-10 bg-white',
        className,
    )}
    on:change={() => document.querySelector('.skill-tabs')?.scrollTo(0, 0)}
>
    <TabList
        class="flex flex-nowrap overflow-x-scroll first:pl-2 last:pr-2 sm:overflow-auto"
    >
        {#each content.categories as { name, id: categoryId } (categoryId)}
            {@const color = getColor(categoryId, 'text')}
            <Tab
                class={({ selected }) =>
                    cx(
                        'py-4 px-2 text-lg',
                        selected ? cx(color, 'underline') : 'text-stone-900',
                    )}>{name}</Tab
            >
        {/each}
    </TabList>
    <TabPanels class="skill-tabs grid overflow-x-scroll">
        {#each content.categories as { id: categoryId } (categoryId)}
            {@const color = getColor(categoryId)}
            <TabPanel
                class={cx('flex flex-nowrap gap-3 bg-opacity-70 p-4', color)}
            >
                {#each getSkillsInCategory(categoryId, content) as skill (skill.name)}
                    <SkillButton {skill} class="whitespace-nowrap" />
                {/each}
            </TabPanel>
        {/each}
    </TabPanels>
</TabGroup>
