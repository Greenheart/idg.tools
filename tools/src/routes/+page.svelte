<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Tools from '$components/Tools.svelte'
    import { selectedSkills, selectedTags, visibleItems } from '$lib/stores'
    import type { PageData } from './$types'
    import { getMostRelevantTools } from '$shared/content-utils'
    import Filters from '$components/Filters.svelte'
    import Meta from '$components/Meta.svelte'
    import { COMMUNITY_LINK, FRAMEWORK_LINK } from '$shared/constants'
    import LinkButton from '$shared/components/LinkButton.svelte'

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
            ? getMostRelevantTools(content, $selectedSkills, $selectedTags)
            : content.tools
</script>

<Meta />

<Heading size={1} class="text-collaborating">Change starts within</Heading>

<div class="py-12 text-lg sm:text-xl">
    <p>Welcome to the Inner Development Goals Community!</p>

    <p class="mt-4">
        This is an emerging network of IDG Hubs who are using the <Link
            href={FRAMEWORK_LINK}
            class="mt-6 font-bold underline">Inner Development Goals</Link
        > (IDGs) to achieve the <Link
            href="https://sdgs.un.org/goals#goals"
            class="font-bold underline">UN Sustainable Development Goals</Link
        > (SDGs).
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-4 sm:justify-start">
        <LinkButton href={COMMUNITY_LINK} variant="secondary">Learn more</LinkButton>
        <LinkButton href="/contribute" variant="primary">Get involved</LinkButton>
    </div>
</div>

<p class="text-center text-base uppercase">Our three pillars:</p>

<div
    class="mx-auto mt-8 grid max-w-lg justify-items-center gap-4 text-center text-stone-50 md:max-w-none md:grid-cols-3 lg:gap-8"
>
    <div class="border-being flex flex-col border-2 p-4">
        <Heading size={2} class="text-being">Tools</Heading>
        <p class="my-4 flex-1">
            We're creating an open source library of scientifically-validated tools to develop the
            skills outlined by the IDG framework. Here you can find methods, workshops and resources
            relevant to the skills you want to practice.
        </p>
        <!-- <Link href="https://idg.tools" variant="pink">Explore IDG.tools</Link> -->
        <Link href="/#explore" variant="pink">Explore IDG.tools</Link>
    </div>

    <div class="border-collaborating flex flex-col border-2 p-4">
        <Heading size={2} class="text-collaborating">Co-creation</Heading>
        <p class="my-4 flex-1">
            We’re a non-profit, open source community, always learning and improving this library,
            together. And with your help, we can make IDG.tools even better!
        </p>
        <Link href="#" variant="pink">Learn more</Link>
    </div>

    <div class="border-relating flex flex-col border-2 p-4">
        <Heading size={2} class="text-relating">Community</Heading>
        <p class="my-4 flex-1">
            With almost 100 Hubs, this is an emerging network eager to participate, explore and
            co-create. Join local events, connect with the global community and learn together.
        </p>
        <Link href={COMMUNITY_LINK} variant="pink">Find your community</Link>
    </div>
</div>

<!-- <div class="space-y-4 pt-12 pb-16 text-lg sm:text-xl">
    <p>
        IDG.tools is the open source toolkit from the <Link
            href="https://www.innerdevelopmentgoals.org/framework"
            class="mt-6 font-bold underline">Inner Development Goals</Link
        > (IDGs) non-profit initiative. The initiative is working to achieve the <Link
            href="https://sdgs.un.org/goals#goals"
            class="font-bold underline">UN Sustainable Development Goals</Link
        > (SDGs) through inner development.
    </p>

    <p>
        We’re creating a library of scientifically-validated methods to develop the skills outlined
        by the IDG framework. Just select which ones you want to practice and find tools relevant
        for you.
    </p>

    <p>
        This toolkit is co-created by and for the community, and primarily contains methods from the <Link
            href="/assets/220927_IDG_Toolkit_v6.pdf"
            class="font-underline font-bold">IDG Phase 2 Research Report</Link
        >. Next, we want to add more tools and resources, and make IDG.tools even better. <Link
            href={FEEDBACK_FORM_LINK}
            class="font-underline font-bold">With your support</Link
        >, we can make it happen!
    </p>
</div> -->

<Heading size={2} class="pb-4 pt-16">1. Choose skills to practice</Heading>
<Filters {content} />

<Heading size={2} class="pb-4 pt-20" id="explore">2. Explore relevant tools</Heading>
<div class="grid gap-8 lg:grid-cols-2">
    <Tools tools={mostRelevantTools} {content} />
</div>
