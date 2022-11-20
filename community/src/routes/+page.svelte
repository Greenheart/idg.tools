<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import { isMenuOpen } from '$lib/stores'
    import type { PageData } from './$types'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import GetInvolved from '$components/GetInvolved.svelte'

    export let data: PageData
    $: ({ content } = data)
</script>

<div class:hidden={$isMenuOpen}>
    <Heading size={1} class="mb-8">Change starts within</Heading>

    <div class="space-y-4 py-12 text-lg sm:text-xl">
        <p>Welcome to the Inner Development Goals Community!</p>

        <p>
            This is an emerging network of hubs who are using the <Link
                href="https://www.innerdevelopmentgoals.org/framework"
                class="mt-6 font-bold underline">Inner Development Goals</Link
            > (IDGs) to achieve the <Link
                href="https://sdgs.un.org/goals#goals"
                class="font-bold underline">UN Sustainable Development Goals</Link
            > (SDGs).
        </p>

        <div class="flex gap-4 pt-8">
            <LinkButton href="#about" variant="secondary">Learn more</LinkButton>
            <LinkButton href="#participate" variant="primary">Get involved</LinkButton>
        </div>
    </div>
</div>

<p class="text-center text-sm uppercase">Our three pillars:</p>

<div class="mt-8 grid grid-cols-3 gap-8">
    <div class="text-center">
        <Heading size={2}>Tools</Heading>
        <p class="my-4">
            We're creating an open source library of scientifically-validated tools to develop the
            skills outlined by the IDG framework. Here you can find exercises, workshops and
            resources relevant to the skills you want to practice.
        </p>
        <Link href="https://idg.tools" variant="pink">Explore IDG.tools</Link>
    </div>

    <div class="text-center">
        <Heading size={2}>Community</Heading>
        <p class="my-4">
            With hubs in almost 100 cities, this is an emerging network eager to participate,
            explore and co-create. Join local events and use our chat rooms to connect and learn
            together with a global network.
        </p>
        <Link href="#" variant="pink">Find your community</Link>
    </div>

    <div class="text-center">
        <Heading size={2}>Stories</Heading>
        <p class="my-4">
            Read stories of how people around the world are using the IDG framework in practice.
            Learn from others and try it with your local hub. Share your own story and help make the
            IDG resources even better!
        </p>
        <Link href="/stories" variant="pink">Inspire and get inspired</Link>
    </div>
</div>

<p>
    We're launching the IDG.community stories as an experiment. However, we need your help to
    sustain this, and realize the full potential. Therefore, we like to invite anyone who want to
    see more IDG community stories in the future to help out. This is a community-driven project,
    and a great opportunity to make a meaningful contribution to further help people engage with the
    IDGs to reach the SDGs.
</p>

<div class="mt-8 grid gap-x-8 py-12">
    <Heading size={2} class="mb-4">Featured stories</Heading>
    <div class="bg-relating flex h-64 flex-col justify-between rounded-2xl p-4">
        <div class="flex flex-col space-y-2">
            {#each content.stories as story}
                <Link
                    href={`/stories/${story.link}`}
                    variant="black"
                    class="grid grid-cols-[min-content_1fr] gap-x-2 rounded-lg bg-stone-50 p-2 no-underline shadow-lg"
                >
                    📝
                    <span>{story.title}</span>
                </Link>
            {/each}
        </div>
        <Link href="/stories" class="self-end" variant="black">See all &rarr</Link>
    </div>
</div>
