<script lang="ts">
    import { onMount } from 'svelte'

    import Skills from '$components/Skills.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import { selectedSkills, isMenuOpen, visibleItems } from '$lib/stores'
    import Tools from '$components/Tools.svelte'

    import type { PageData } from './$types'
    import SkillTabs from '$components/SkillTabs.svelte'
    export let data: PageData
    $: ({ content } = data)

    onMount(async () => {
        selectedSkills.useLocalStorage()
        visibleItems.useLocalStorage()
    })

    // TODO: Improve filtering logic, and break out into a function called `getMostRelevantTools()`
    $: mostRelevantTools = $selectedSkills.length
        ? content.tools.filter((tool) =>
              tool.relevancy.some(({ skill }) =>
                  $selectedSkills.includes(skill),
              ),
          )
        : content.tools
</script>

<div class:hidden={$isMenuOpen}>
    <Heading size={1}>Change starts within</Heading>

    <div class="space-y-4 py-12 text-xl">
        <p>
            IDG.tools is the digital field kit for the <Link
                href="https://www.innerdevelopmentgoals.org/framework"
                class="mt-6 font-bold underline">Inner Development Goals</Link
            > (IDGs) initiative.
        </p>

        <p>
            The IDGs helps us develop the skills needed to achieve the <Link
                href="https://sdgs.un.org/goals#goals"
                class="font-bold underline"
                >UN Sustainable Development Goals</Link
            > (SDGs).
        </p>
    </div>
</div>

<div class="grid gap-8 lg:grid-cols-2" class:hidden={$isMenuOpen}>
    <Heading size={2} class="-order-3">Choose skills to practice</Heading>
    <Heading size={2} class="-order-1">Most relevant tools</Heading>
    <Skills {content} class="hidden lg:-order-1 lg:block" />
    <SkillTabs {content} class="-order-2 lg:order-none lg:hidden" />
    <Tools tools={mostRelevantTools} {content} />
</div>
