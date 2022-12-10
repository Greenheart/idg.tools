<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import StoriesSection from '$components/StoriesSection.svelte'
    import { COMMUNITY_LINK, FRAMEWORK_LINK, IDG_TOOLKIT_LAUNCH } from '$shared/constants'
    import Stories from '$components/Stories.svelte'

    export let data: PageData
    $: ({ content } = data)
</script>

<Meta />

<Heading size={1}>Change starts within</Heading>

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
        <Heading size={2}>Tools</Heading>
        <p class="my-4 flex-1">
            We're creating an open source library of scientifically-validated tools to develop the
            skills outlined by the IDG framework. Here you can find methods, workshops and resources
            relevant to the skills you want to practice.
        </p>
        <!-- <Link href="https://idg.tools" variant="pink">Explore IDG.tools</Link> -->
        <Link href={IDG_TOOLKIT_LAUNCH} variant="pink">Join the launch December 15th</Link>
    </div>

    <div class="border-relating flex flex-col border-2 p-4">
        <Heading size={2}>Hubs</Heading>
        <p class="my-4 flex-1">
            With almost 100 Hubs, this is an emerging network eager to participate, explore and
            co-create. Join local events, connect with the global community and learn together.
        </p>
        <Link href={COMMUNITY_LINK} variant="pink">Find your community</Link>
    </div>

    <div class="border-collaborating flex flex-col border-2 p-4">
        <Heading size={2}>Stories</Heading>
        <p class="my-4 flex-1">
            Read stories of how people around the world are using the IDG framework in practice.
            Learn from others and try it with your local hub. Share your own story and help make the
            IDG resources even better!
        </p>
        <Link href="#stories" variant="pink">Inspire and get inspired</Link>
    </div>
</div>

<StoriesSection />

<Stories {content} />
