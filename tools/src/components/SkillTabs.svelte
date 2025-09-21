<script lang="ts">
    import { Tabs } from 'bits-ui'
    import { onDestroy, onMount } from 'svelte'
    import { fade } from 'svelte/transition'
    import type { MouseEventHandler } from 'svelte/elements'

    import { globalState } from '$lib/global-state.svelte'
    import { getSkillsInDimension } from '$shared/content-utils'
    import { getColor, getOffset, getRGBColor } from '$lib/utils'
    import type { Dimension, Skill, ToolsContent } from '$shared/types'
    import SkillButton from './SkillButton.svelte'
    import { Button, Link, Heading } from '$shared/components'
    import { Info } from '$shared/icons'
    import { browser } from '$app/environment'
    import { persistedState } from '$lib/persisted-state.svelte'

    interface Props {
        content: ToolsContent
        class?: string
    }

    let { content, class: className = '' }: Props = $props()

    let ticking = $state(false)
    let loaded = $state(false)
    let lastScrollTop = $state(0)
    let skillTabs = $state<HTMLDivElement>()!
    let selectedTab = $state<Dimension['id']>(content.dimensions[0].id)

    // Add a bit extra offset to prevent accidentally closing on initial page load
    // if the user is navigating to an anchor link, and thus scrolling.
    const offset = 20

    const updateFiltersVisiblity = (newScrollTop: number) => {
        if (newScrollTop > lastScrollTop) {
            // Scrolling down - only hide when user has scrolled down a bit on the page
            if (
                newScrollTop - offset >
                getOffset(document.querySelector('#explore') as HTMLElement).top
            ) {
                skillTabs.classList.add('hidden')
            }
        } else {
            // Scrolling up
            if (
                newScrollTop - offset <=
                getOffset(document.querySelector('#explore') as HTMLElement).top
            ) {
                skillTabs.classList.remove('hidden')
            }
        }
        lastScrollTop = newScrollTop <= 0 ? 0 : newScrollTop // Handle mobile and negative scrolling
    }

    // NOTE: Maybe reimplement this using IntersectionObserver to improve performance
    // Or throttle the scroll event handler
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    const onScroll = () => {
        let newScrollTop = window.scrollY || document.documentElement.scrollTop
        // Prevent horizontal scrolling
        if (newScrollTop === lastScrollTop) return
        // Prevent triggering scroll when layout changes due to for example selecting skills
        if (!globalState.listenForScroll) return

        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateFiltersVisiblity(newScrollTop)
                ticking = false
            })
        }
        ticking = true
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
        globalState.listenForScroll = false
        const alreadySelected = skills.filter((skillId) =>
            persistedState.selectedSkills.current.includes(skillId),
        )

        // Select all if not all skills are yet selected
        if (alreadySelected.length < skills.length) {
            persistedState.selectedSkills.current = [
                ...persistedState.selectedSkills.current,
                ...skills.filter((skillId) => !alreadySelected.includes(skillId)),
            ]
        } else {
            // Unselect all if everything is already selected
            persistedState.selectedSkills.current = persistedState.selectedSkills.current.filter(
                (skillId) => !alreadySelected.includes(skillId),
            )
        }
        setTimeout(() => {
            globalState.listenForScroll = true
        }, 100)
    }

    const ensureDimensionTabIsVisible: MouseEventHandler<HTMLDivElement> = (event) =>
        (event.target as HTMLButtonElement).scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        })
</script>

<div class="xs:grid-cols-[1fr_max-content] grid items-center gap-y-1 pb-2">
    <Heading size={2} class="inline"
        >1. Choose skills to <span class="whitespace-nowrap"
            >practice<Link
                unstyled
                href="/framework"
                title="Learn more about the IDG framework"
                class="pl-1"
            >
                <Info class="mb-0.5 inline" />
            </Link></span
        ></Heading
    >
</div>

<div
    class={[
        'sticky top-0 z-10 -ml-4 -mr-4 h-[164px] bg-stone-300 px-4 sm:-ml-8 sm:-mr-8 sm:h-[148px] sm:px-8 lg:h-[108px]',
        className,
    ]}
>
    <div class="relative h-[164px] sm:h-[148px] lg:h-[108px]">
        {#if loaded}
            <div in:fade>
                <Tabs.Root
                    value={selectedTab}
                    onValueChange={() => {
                        skillTabs.classList.remove('hidden')
                    }}
                    class="absolute left-0 right-0 top-0 -ml-4 -mr-4 overflow-hidden bg-black text-white shadow-xl sm:-ml-8 sm:-mr-8"
                >
                    <Tabs.List
                        class="xs:overflow-auto flex flex-nowrap overflow-x-scroll"
                        onclick={ensureDimensionTabIsVisible}
                    >
                        {#each content.dimensions as { name, id: dimensionId } (dimensionId)}
                            <Tabs.Trigger
                                value={dimensionId}
                                class={[
                                    'text-base! data-[state=inactive]:text-white! sm:text-lg! px-2 py-4 first:pl-4 last:pr-4 data-[state=active]:underline',
                                ]}
                                style="color: {getRGBColor(dimensionId)}">{name}</Tabs.Trigger
                            >
                        {/each}
                    </Tabs.List>
                    <div bind:this={skillTabs} class="flex h-full items-start text-black">
                        {#each content.dimensions as { id: dimensionId, skills } (dimensionId)}
                            {@const color = getColor(dimensionId)}
                            <Tabs.Content
                                value={dimensionId}
                                class={[
                                    'xs:gap-2 flex h-full flex-1 flex-wrap gap-1 overflow-auto p-2',
                                    color,
                                ]}
                            >
                                <Button
                                    variant="inverted"
                                    size="sm"
                                    onclick={() => toggleSkills(skills)}
                                    class="xs:text-base whitespace-nowrap text-sm font-normal"
                                    >Choose all</Button
                                >
                                {#each getSkillsInDimension(dimensionId, content.skills) as skill (skill.name)}
                                    <SkillButton {skill} class="xs:whitespace-nowrap" />
                                {/each}
                            </Tabs.Content>
                        {/each}
                    </div>
                </Tabs.Root>
            </div>
        {/if}
    </div>
</div>
