<script lang="ts">
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import { isMenuOpen } from '$lib/stores'
    import type { PageData } from './$types'
    import LinkButton from '$components/LinkButton.svelte'

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
                class="font-bold underline"
                >UN Sustainable Development Goals</Link
            > (SDGs).
        </p>

        <div class="flex gap-4 pt-8">
            <LinkButton href="#about" variant="secondary">Learn more</LinkButton
            >
            <LinkButton href="#participate" variant="primary"
                >Get involved</LinkButton
            >
        </div>
    </div>
</div>

<p class="text-center uppercase text-sm">Our three pillars:</p>

<div class="grid grid-cols-3 gap-8 mt-8">
    <div class="text-center">
        <Heading size={2}>Tools</Heading>
        <p class="my-4">
            We're creating an open source library of scientifically-validated
            methods to develop the skills outlined by the IDG framework. Here
            can find exercises, workshops and resources relevant to the skills
            you want to practice.
        </p>
        <Link href="https://idg.tools" variant="pink">Explore IDG.tools</Link>
    </div>

    <div class="text-center">
        <Heading size={2}>Community</Heading>
        <p class="my-4">
            With hubs in almost 100 cities, this is an emerging network eager to
            participate, explore and co-create. Join local events and use our
            chat rooms to connect and learn together with a global network.
        </p>
        <Link
            href="https://app.element.io/#/room/#idg:community.innerdevelopmentgoals.org"
            variant="pink">Join us on Element</Link
        >
    </div>

    <div class="text-center">
        <Heading size={2}>Stories</Heading>
        <p class="my-4">
            Read stories of how people around the world are applying the IDG
            framework in their context. Learn from others and try it with your
            local hub. Share your own story and help make the IDG resources even
            better!
        </p>
        <Link href="#stories" variant="pink">Get inspired</Link>
    </div>
</div>
