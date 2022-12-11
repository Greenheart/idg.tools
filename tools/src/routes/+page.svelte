<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Tools from '$components/Tools.svelte'
    import { selectedSkills, selectedTags } from '$lib/stores'
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
        This early version is primarily based on the <Link
            href="/assets/220927_IDG_Toolkit_v6.pdf"
            class="font-underline font-bold"
            variant="black">IDG Phase 2 Research Report</Link
        >. Now, you're invited to explore the IDGs in practice, and help make this toolkit even
        better!
    </div>

    <div class="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 sm:justify-start">
        <LinkButton href="#about" variant="secondary">Learn more</LinkButton>
        <LinkButton href="#explore" variant="primary">Explore tools</LinkButton>
    </div>
</div>

<p class="text-center text-base uppercase">Our three pillars:</p>

<div
    class="mx-auto mt-8 grid max-w-lg justify-items-center gap-4 text-center text-stone-50 md:max-w-none md:grid-cols-3 lg:gap-8"
>
    <div class="border-being flex flex-col border p-4">
        <Heading size={2} class="text-being">Tools</Heading>
        <p class="my-4 flex-1">
            We're creating an open source library of scientifically-validated tools to develop the
            skills outlined by the IDG framework. Here you can find methods, workshops and resources
            relevant to the skills you want to practice.
        </p>
        <Link href="#explore" variant="pink">Explore tools</Link>
    </div>

    <div class="border-collaborating flex flex-col border p-4">
        <Heading size={2} class="text-collaborating">Co-creation</Heading>
        <p class="my-4 flex-1">
            This toolkit is created by and for the community. Welcome to suggest improvements, new
            tools or even design and develop the app. Read the principles of tools, and how to join
            the co-creation.
        </p>
        <!-- TODO: add contributing link relevant for tools -->
        <Link href="#" variant="pink">Get involved</Link>
    </div>

    <div class="border-relating flex flex-col border p-4">
        <Heading size={2} class="text-relating">Community</Heading>
        <p class="my-4 flex-1">
            With almost 100 IDG Hubs, these tools are used by an emerging network eager to
            participate, explore and co-create. Join local events, connect with the global community
            and learn together.
        </p>
        <Link href={COMMUNITY_LINK} variant="pink">Find your community</Link>
    </div>
</div>

<Heading size={2} class="pb-4 pt-16">1. Choose skills to practice</Heading>
<Filters {content} />

<Heading size={2} class="pb-4 pt-20" id="explore">2. Explore relevant tools</Heading>
<div class="grid gap-8 lg:grid-cols-2">
    <Tools tools={mostRelevantTools} {content} />
</div>
