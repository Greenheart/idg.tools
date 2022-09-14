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

<!-- TODO: Do something about the slow initial render after page refresh. Likely caused by waiting for the app to mount, and reading from localStorage before rendering -->
<div class={cx('sticky top-0 z-10 h-[146px] md:h-[131px]', className)}>
    <div class="relative">
        <TabGroup
            class="absolute top-0 left-0 right-0 -ml-4 -mr-4 overflow-hidden bg-stone-900 text-stone-50 shadow-2xl"
            on:change={() =>
                document.querySelector('.skill-tabs')?.scrollTo(0, 0)}
        >
            <TabList
                class="xs:overflow-auto flex flex-nowrap overflow-x-scroll"
            >
                {#each content.categories as { name, id: categoryId } (categoryId)}
                    {@const color = getColor(categoryId, 'text')}
                    <Tab
                        class={({ selected }) =>
                            cx(
                                'py-4 px-2 text-lg first:pl-4 last:pr-4',
                                selected
                                    ? cx(color, 'underline')
                                    : 'text-stone-50',
                            )}>{name}</Tab
                    >
                {/each}
            </TabList>
            <TabPanels class="skill-tabs grid overflow-x-scroll text-stone-900">
                {#each content.categories as { id: categoryId } (categoryId)}
                    {@const color = getColor(categoryId)}
                    <TabPanel
                        class={cx(
                            'flex flex-nowrap gap-2 bg-opacity-70 p-4',
                            color,
                        )}
                    >
                        {#each getSkillsInCategory(categoryId, content) as skill (skill.name)}
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
</div>
