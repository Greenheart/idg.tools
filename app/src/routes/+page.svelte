<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import Tools from '$components/Tools.svelte'
    import {
        selectedSkills,
        isMenuOpen,
        visibleItems,
        filtersExpanded,
    } from '$lib/stores'
    import type { PageData } from './$types'
    import { getMostRelevantContent } from '$lib/utils'
    import Filters from '$components/Filters.svelte'

    export let data: PageData
    $: ({ content } = data)

    onMount(() => {
        selectedSkills.useLocalStorage()
        visibleItems.useLocalStorage()
    })

    $: mostRelevantTools = $selectedSkills.length
        ? getMostRelevantContent(content, $selectedSkills)
        : content.tools
</script>

<div class:hidden={$isMenuOpen}>
    <Heading size={1}>Change starts within</Heading>

    <div class="space-y-4 py-12 text-lg sm:text-xl">
        <p>
            IDG.tools is the digital field-kit for the <Link
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

<Heading size={2} class="mb-4">1. Choose skills to practice</Heading>
<Filters {content} />

<Heading size={2} class="mb-4 mt-16">2. Explore relevant tools</Heading>
<div class="grid gap-8 lg:grid-cols-2" class:hidden={$isMenuOpen}>
    <Tools tools={mostRelevantTools} {content} />
</div>
