<script lang="ts">
    import { onMount } from 'svelte'

    import Skills from '$components/Skills.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import { selectedSkills, isMenuOpen } from '$lib/stores'
    import Tools from '$components/Tools.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ content } = data)

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })
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

<div class="grid grid-cols-2 gap-8" class:hidden={$isMenuOpen}>
    <Heading size={2}>Choose skills to practice</Heading>
    <Heading size={2}>Most relevant tools</Heading>
    <Skills {content} />
    <!-- TODO: Improve filtering logic, and break out into a function called `getMostRelevantTools()` -->
    <Tools
        tools={$selectedSkills.length
            ? content.tools.filter((tool) =>
                  tool.relevancy.some(({ skill }) =>
                      $selectedSkills.includes(skill),
                  ),
              )
            : content.tools}
        {content}
    />
</div>
