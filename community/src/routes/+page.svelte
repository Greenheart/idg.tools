<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import { isMenuOpen } from '$lib/stores'
    import type { PageData } from './$types'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import StoryPreview from '$components/StoryPreview.svelte'
    import StoriesSection from '$components/StoriesSection.svelte'
    import { COMMUNITY_LINK, FRAMEWORK_LINK } from '$shared/constants'

    export let data: PageData
    $: ({ content } = data)
</script>

<div class:hidden={$isMenuOpen}>
    <Heading size={1}>Change starts within</Heading>

    <div class="space-y-4 py-12 text-lg sm:text-xl">
        <p>Welcome to the Inner Development Goals Community!</p>

        <p>
            This is an emerging network of hubs who are using the <Link
                href={FRAMEWORK_LINK}
                class="mt-6 font-bold underline">Inner Development Goals</Link
            > (IDGs) to achieve the <Link
                href="https://sdgs.un.org/goals#goals"
                class="font-bold underline">UN Sustainable Development Goals</Link
            > (SDGs).
        </p>

        <div class="flex flex-wrap justify-center gap-4 sm:justify-start">
            <LinkButton href={COMMUNITY_LINK} variant="secondary">Learn more</LinkButton>
            <LinkButton href="#participate" variant="primary">Get involved</LinkButton>
        </div>
    </div>
</div>

<p class="text-center text-base uppercase">Our three pillars:</p>

<div
    class="mx-auto mt-8 grid max-w-lg justify-items-center gap-4 text-center text-stone-50 md:max-w-none md:grid-cols-3 md:text-stone-50 lg:gap-8"
>
    <div class="border-being flex flex-col rounded-2xl border-2 p-4 md:w-full md:bg-transparent">
        <Heading size={2}>Tools</Heading>
        <p class="my-4 flex-1">
            We're creating an open source library of scientifically-validated tools to develop the
            skills outlined by the IDG framework. Here you can find methods, workshops and resources
            relevant to the skills you want to practice.
        </p>
        <Link href="https://idg.tools" variant="pink">Explore IDG.tools</Link>
    </div>

    <div class="border-relating flex flex-col rounded-2xl border-2 p-4 md:w-full md:bg-transparent">
        <Heading size={2}>Community</Heading>
        <p class="my-4 flex-1">
            With hubs in almost 100 cities, this is an emerging network eager to participate,
            explore and co-create. Join local events, connect with the global community and learn
            together.
        </p>
        <Link href={COMMUNITY_LINK} variant="pink">Find your community</Link>
    </div>

    <div
        class="border-collaborating flex flex-col rounded-2xl border-2 p-4 md:w-full md:bg-transparent"
    >
        <Heading size={2}>Stories</Heading>
        <p class="my-4 flex-1">
            Read stories of how people around the world are using the IDG framework in practice.
            Learn from others and try it with your local hub. Share your own story and help make the
            IDG resources even better!
        </p>
        <Link href="/stories" variant="pink">Inspire and get inspired</Link>
    </div>
</div>

<StoriesSection />

<Heading class="mb-4 mt-16">Featured stories</Heading>

<div
    class="mx-auto grid max-w-lg items-start justify-items-center gap-8 md:w-full md:max-w-none md:grid-cols-2 lg:gap-x-12"
>
    {#each content.stories as story}
        <StoryPreview {story} {content} />
    {/each}
</div>

<!-- TODO: only include featured stories in the top section -->
<!-- TODO: show all stories here below -->
<!-- TODO: add filters based on tags to be able to find the most relevant types of stories -->
<!-- TODO: add tags to content for testing purposes -->
<!-- TODO: fix images within posts in the CMS - until it works, it's possible to work around it by adding images using the global asset upload, and then referencing them using markdown formatting -->
<!-- TODO: Improve the layout of posts, wider title, better display of the image, show relevant posts beneath (and link back to start page) -->
<!-- TODO: Write contributing markdown document that can also be rendered as a page - stories, content, design and development -->
<!--
    IDEA: UI for filters could be to select the tags you want to find
    This would make stories re-order based on the nice transition in the svelte todo list example

    Selecting multiple tags should be possible to filter for the comibinations.default

    Add a clear button to remove

    Refactor the display of stories and filters into a <Stories /> component to keep the landing page clean.
-->
