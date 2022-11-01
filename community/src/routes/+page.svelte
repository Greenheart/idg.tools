<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import {
        selectedSkills,
        selectedTags,
        isMenuOpen,
        visibleItems,
    } from '$lib/stores'
    import type { PageData } from './$types'
    import { getMostRelevantContent } from '$lib/utils'

    export let data: PageData
    $: ({ content } = data)

    onMount(() => {
        // NOTE: Maybe we could limit the number of re-renders by showing a loading state until all of these have updated?
        selectedSkills.useLocalStorage()
        selectedTags.useLocalStorage()
        visibleItems.useLocalStorage()
    })

    $: mostRelevantTools =
        $selectedSkills.length || $selectedTags.length
            ? getMostRelevantContent(content, $selectedSkills, $selectedTags)
            : content.tools
</script>

<div class:hidden={$isMenuOpen}>
    <Heading size={1}>Change starts within</Heading>

    <div class="space-y-4 py-12 text-lg sm:text-xl">
        <p>
            IDG.community is the open source toolkit for the <Link
                href="https://www.innerdevelopmentgoals.org/framework"
                class="mt-6 font-bold underline">Inner Development Goals</Link
            > (IDGs) non-profit initiative. The initiative is working to achieve
            the <Link
                href="https://sdgs.un.org/goals#goals"
                class="font-bold underline"
                >UN Sustainable Development Goals</Link
            > (SDGs) through inner development.
        </p>

        <p>
            We’re building a library of scientifically-validated methods to
            develop the skills outlined by the IDG framework. Just select which
            ones you want to practice and find tools relevant for you.
        </p>
    </div>
</div>

<Heading size={2} class="mb-4">1. Choose skills to practice</Heading>

<Heading size={2} class="mb-4 mt-16">Latest stories</Heading>
