<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$shared/components/Link.svelte'
    import Info from '$shared/icons/Info.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Tools from '$components/Tools.svelte'
    import { selectedSkills, selectedTags } from '$lib/stores'
    import type { PageData } from './$types'
    import { getMostRelevantTools } from '$shared/content-utils'
    // import Filters from '$components/Filters.svelte'
    import Meta from '$components/Meta.svelte'
    import { FRAMEWORK_LINK } from '$shared/constants'
    import LinkButton from '$shared/components/LinkButton.svelte'

    export let data: PageData
    $: ({ content } = data)

    onMount(() => {
        // NOTE: Maybe we could limit the number of re-renders by showing a loading state until all of these have updated?
        selectedSkills.useLocalStorage()
        selectedTags.useLocalStorage()
    })

    $: mostRelevantTools =
        $selectedSkills.length || $selectedTags.length
            ? getMostRelevantTools(content, $selectedSkills, $selectedTags)
            : content.tools
</script>

<Meta />

<Heading size={1} class="text-collaborating">Change starts within</Heading>

<div class="py-12 text-lg sm:text-xl">
    <p>Welcome to the Inner Development Goals Toolkit!</p>

    <p class="mt-4">
        This is an emerging library of tools to explore the <Link
            href={FRAMEWORK_LINK}
            class="mt-6 font-bold underline">Inner Development Goals</Link
        > (IDGs) in practice, and help people and organizations reach the <Link
            href="https://sdgs.un.org/goals#goals"
            class="font-bold underline">UN Sustainable Development Goals</Link
        > (SDGs).
    </p>

    <div class="mt-8 bg-stone-50 p-4 text-stone-900">
        <!-- TODO: clarify that this is a work in progress -->
        This early version is primarily based on the <Link
            href="/assets/220927_IDG_Toolkit_v6.pdf"
            class="font-underline font-bold"
            variant="black">IDG Phase 2 Research Report</Link
        >. Now, you're invited to explore the IDGs in practice, and help make this toolkit even
        better!
    </div>

    <div class="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start">
        <LinkButton href="/about" variant="secondary">Learn more</LinkButton>
        <LinkButton href="#explore" variant="primary" class="border border-transparent"
            >Explore tools</LinkButton
        >
    </div>
</div>

<Heading size={2} class="flex items-center gap-3 pb-4 pt-16"
    >1. Choose skills to practice<Link
        unstyled
        href={FRAMEWORK_LINK}
        title="Learn more about the IDG framework"><Info class="mt-1" /></Link
    ></Heading
>
<!-- <Filters {content} /> -->

<Heading size={2} class="pb-4 pt-20" id="explore">2. Explore relevant tools</Heading>
<div class="grid gap-8 lg:grid-cols-2">
    <Tools tools={mostRelevantTools} {content} />
</div>
