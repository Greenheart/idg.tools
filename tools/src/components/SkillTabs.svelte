<script lang="ts">
    import { TabGroup, Tab, TabList, TabPanel, TabPanels } from '@rgossiaux/svelte-headlessui'
    import { onDestroy, onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import { selectedSkills, selectedTags, listenForScroll } from '$lib/stores'

    import { getSkillsInDimension } from '$shared/content-utils'
    import { cx, getColor, onKeydown, getOffset } from '$lib/utils'
    import type { Skill, ToolsContent } from '$shared/types'
    import SkillButton from './SkillButton.svelte'
    import Button from '$shared/components/Button.svelte'
    import Link from '$shared/components/Link.svelte'
    import { FRAMEWORK_LINK } from '$shared/constants'
    import Info from '$shared/icons/Info.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import { browser } from '$app/environment'

    let loaded = false
    let lastScrollTop = 0
    let skillTabs: HTMLDivElement
    // Add a bit extra offset to prevent accidentally closing on initial page load
    // if the user is navigating to an anchor link, and thus scrolling.
    const offset = 20

    const getSkillTabs = () => {
        if (skillTabs) return skillTabs
        skillTabs = document.querySelector('.skill-tabs') as HTMLDivElement
        return skillTabs
    }

    // NOTE: Maybe reimplement this using IntersectionObserver to improve performance
    // Or throttle the scroll event handler
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const onScroll = async () => {
        let st = window.pageYOffset || document.documentElement.scrollTop
        // Prevent horizontal scrolling
        if (st === lastScrollTop) return
        // Prevent triggering scroll when layout changes due to for example selecting skills

        if (!$listenForScroll) return

        const element = getSkillTabs()
        if (st > lastScrollTop) {
            // Scrolling down - only hide when user has scrolled down a bit on the page
            if (
                window.scrollY - offset >
                getOffset(document.querySelector('#explore') as HTMLElement).top
            ) {
                element.classList.add('hidden')
            }
        } else {
            // Scrolling up
            if (
                window.scrollY - offset <=
                getOffset(document.querySelector('#explore') as HTMLElement).top
            ) {
                element.classList.remove('hidden')
            }
        }
        lastScrollTop = st <= 0 ? 0 : st // Handle mobile and negative scrolling
    }
    onMount(() => {
        loaded = true
        setTimeout(() => {
            // This bg color is only used as a skeleton loader to create a smoother loading UX.
            document.querySelector('.sticky.bg-stone-300')?.classList.remove('bg-stone-300')
        }, 200)

        // Maybe debounce or throttle scroll handler. Look up what the modern, performant option is
        window.addEventListener('scroll', onScroll, false)
    })

    onDestroy(() => {
        if (browser) {
            window.removeEventListener('scroll', onScroll, false)
        }
    })

    const toggleSkills = async (skills: Skill['id'][]) => {
        $listenForScroll = false
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
        setTimeout(() => {
            $listenForScroll = true
        }, 100)
    }

    const onChange = () => {
        getSkillTabs().classList.remove('hidden')
        getSkillTabs().scrollTo(0, 0)
    }

    // NOTE: Unsure why type for mouse event doesn't work
    const onTabClick = (event: any) => {
        getSkillTabs().classList.remove('hidden')
        event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }

    const resetFilters = () => {
        $selectedSkills = []
        $selectedTags = []
        getSkillTabs().classList.remove('hidden')
    }

    export let content: ToolsContent
    let className = ''
    export { className as class }
</script>

<div class="grid gap-y-2 pb-2 pt-16 sm:grid-cols-[1fr_max-content]">
    <Heading size={2}>1. Choose skills to practice</Heading>
    <div class="flex items-center sm:justify-end">
        <Link unstyled href={FRAMEWORK_LINK} title="Learn more about the IDG framework" class="p-1">
            <Info class="mt-0.5" />
        </Link>
        <!-- TODO: implement advanced filters as modal -->
        <!-- <Button variant="unstyled" size="sm" class="text-sm font-bold underline"
            >Advanced filters</Button
        > -->
        <Button
            variant="unstyled"
            on:click={resetFilters}
            size="sm"
            class="text-sm font-bold underline">Reset</Button
        >
    </div>
</div>

<div
    class={cx(
        'sticky top-0 z-10 -mr-4 -ml-4 h-[164px] bg-stone-300 px-4 sm:-mr-8 sm:-ml-8 sm:h-[148px] sm:px-8 md:h-[] lg:h-[108px]',
        className,
    )}
>
    <div class="relative h-[164px] sm:h-[148px] lg:h-[108px]">
        {#if loaded}
            <div in:fade>
                <TabGroup
                    class="absolute top-0 left-0 right-0 -ml-4 -mr-4 overflow-hidden bg-black text-white shadow-xl sm:-mr-8 sm:-ml-8"
                    on:change={onChange}
                >
                    <TabList class="xs:overflow-auto flex flex-nowrap overflow-x-scroll">
                        {#each content.dimensions as { name, id: dimensionId } (dimensionId)}
                            {@const color = getColor(dimensionId, 'text')}
                            <Tab
                                on:click={onTabClick}
                                on:keydown={onKeydown(onTabClick)}
                                class={({ selected }) =>
                                    cx(
                                        'py-4 px-2 !text-base first:pl-4 last:pr-4 sm:!text-lg',
                                        selected ? cx(color, 'underline') : 'text-white',
                                    )}>{name}</Tab
                            >
                        {/each}
                    </TabList>
                    <TabPanels class="skill-tabs flex h-full items-start text-black">
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
    </div>
</div>
