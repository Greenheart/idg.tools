<script lang="ts">
    import {
        Disclosure,
        DisclosureButton,
        DisclosurePanel,
        Tab,
        TabGroup,
        TabList,
        TabPanel,
        TabPanels,
    } from '@rgossiaux/svelte-headlessui'
    import { derived, writable } from 'svelte/store'
    import { Node, Svelvet, Edge } from 'svelvet'

    import { page } from '$app/stores'
    import { Heading } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { getSkill, getSkillsInDimension } from '$shared/content-utils'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { IDGSymbol, ChevronDown } from '$shared/icons'
    import { cx, getColor, getDimensionSlug, getRGBColor } from '$shared/utils'

    export let data: PageData

    const selectedDimensionIndex = writable(0)

    // Ensure the page re-renders when the URL (and the data) changes.
    const dimensions = derived(page, () => data.dimensions)
    const skills = derived(page, () => data.skills)
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<Svelvet width={600} height={800} id="idg-framework" TD controls fitView>
    {#each $dimensions as dimension, i (dimension.name)}
        <!-- {@const dimensionSlug = getDimensionSlug(dimension.id)} -->
        <Node
            borderRadius={9999}
            bgColor="#{getRGBColor(dimension.id).slice(1)}"
            width={200}
            height={200}
            label={dimension.name}
            textColor="black"
            position={{ x: i * 750 + 40 * dimension.skills.length, y: 0 }}
            id={dimension.id}
            connections={dimension.skills}
            inputs={0}
            editable={false}
            outputs={dimension.skills.length}
            on:nodeClicked={() => {
                console.log('click', dimension.name)
            }}
        />

        {#each getSkillsInDimension(dimension.id, { skills: $skills }) as skill, j (skill.name)}
            <Node
                borderRadius={9999}
                bgColor="#{getRGBColor(dimension.id).slice(1)}"
                width={100}
                height={100}
                editable={false}
                label={skill.name}
                textColor="black"
                position={{ x: i * 750 + j * 125, y: 400 }}
                id={skill.id}
                connections={[dimension.id]}
                inputs={1}
                outputs={0}
            />
        {/each}
    {/each}
</Svelvet>

<!-- <div class="min-h-[700px] bg-white relative pb-16 max-w-xs mx-auto">
    {#key $dimensions}
        {#if $dimensions}
            <div class="text-base h-full">
                <div class="flex justify-end p-2">
                    <LocaleSwitcher
                        supportedLocales={data.supportedLocales}
                        pathname={$page.url.pathname}
                        currentLocale={$page.params.locale}
                    />
                </div>

                <TabGroup defaultIndex={$selectedDimensionIndex}>
                    <TabList class="text-white grid grid-cols-5" let:selectedIndex>
                        {#each $dimensions as dimension, i (dimension.name)}
                            {@const dimensionSlug = getDimensionSlug(dimension.id)}
                            <Tab
                                class="p-2 grid place-items-center {selectedIndex === i
                                    ? `${getColor(dimension.id)}`
                                    : `bg-white hover:outline hover:outline-1 hover:outline-${dimensionSlug} hover:-outline-offset-1`}"
                                on:click={() => {
                                    if (selectedIndex) {
                                        $selectedDimensionIndex = selectedIndex
                                    }
                                }}
                            >
                                <IDGSymbol
                                    slug={dimensionSlug}
                                    class="pointer-events-none w-12 h-12 {selectedIndex === i
                                        ? 'text-white'
                                        : getColor(dimension.id, 'text')}"
                                />
                            </Tab>
                        {/each}
                    </TabList>
                    <TabPanels>
                        {#each $dimensions as dimension, i (dimension.name)}
                            {@const dimensionSlug = getDimensionSlug(dimension.id)}
                            {@const bgColor = getColor(dimension.id, 'bg')}
                            {@const textColor = getColor(dimension.id, 'text')}
                            <TabPanel class={cx('w-full max-w-md grid text-white', bgColor)}>
                                <Heading size={2} class="p-4 pb-1 break-words hyphens-auto"
                                    >{i + 1}. {dimension.name}</Heading
                                >
                                <Heading size={4} class="px-4">{dimension.subtitle}</Heading>
                                <IDGSymbol
                                    slug={dimensionSlug}
                                    class="pointer-events-none w-36 h-36 my-4 mx-auto"
                                />
                                <p class="p-4 pt-0">{dimension.description}</p>

                                <div class="py-2 bg-white space-y-2">
                                    {#each getSkillsInDimension( dimension.id, { skills: $skills }, ) as skill (skill.name)}
                                        <Disclosure class="grid" let:open>
                                            <DisclosureButton
                                                class={cx(
                                                    'p-2 flex gap-2 items-center hover:bg-white hover:text-black text-left group drop-shadow-xl max-w-xs',
                                                    `hover:outline hover:outline-${dimensionSlug} hover:outline-1 hover:-outline-offset-1`,
                                                    bgColor,
                                                )}
                                            >
                                                <IDGSymbol
                                                    slug={dimensionSlug}
                                                    class="w-10 h-10 shrink-0 group-hover:!{textColor}"
                                                />
                                                <p class="text-sm w-full">
                                                    {skill.name}
                                                </p>
                                                <ChevronDown
                                                    class={cx(
                                                        'mx-1 flex-grow',
                                                        open ? 'rotate-180' : 'rotate-0',
                                                    )}
                                                />
                                            </DisclosureButton>
                                            <DisclosurePanel class="bg-white max-w-xs">
                                                <Heading
                                                    size={2}
                                                    class={cx(
                                                        'p-4 break-words hyphens-auto',
                                                        textColor,
                                                    )}>{skill.name}</Heading
                                                >
                                                <div
                                                    class={cx(
                                                        'mx-4 p-2 rounded-lg aspect-square flex items-center justify-center',
                                                        bgColor,
                                                    )}
                                                >
                                                    <IDGSymbol
                                                        slug={dimensionSlug}
                                                        class="pointer-events-none w-36 h-36 my-4 mx-auto text-white"
                                                    />
                                                </div>
                                                <p class="p-4 text-black">{skill.description}</p>
                                            </DisclosurePanel>
                                        </Disclosure>
                                    {/each}
                                </div>
                            </TabPanel>
                        {/each}
                    </TabPanels>
                </TabGroup>
            </div>
        {/if}
    {/key}
</div> -->
