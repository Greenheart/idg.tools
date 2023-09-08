<script lang="ts">
    import { Link, Heading, LinkButton, ButtonGroup } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { COMMUNITY_LINK, FRAMEWORK_LINK } from '$shared/constants'
    import Stories from '$components/Stories.svelte'

    export let data: PageData
    $: ({ content } = data)
</script>

<Meta />

<Heading size={1} class="text-collaborating">Change starts within</Heading>

<div class="py-12 text-lg">
    <p>Welcome to the Inner Development Goals Community!</p>

    <p class="mt-4">
        This is an emerging network of IDG Hubs who are using the <Link
            href={FRAMEWORK_LINK}
            variant="black">Inner Development Goals</Link
        > (IDGs) to accelerate progress towards the <Link
            href="https://sdgs.un.org/goals#goals"
            variant="black">UN Sustainable Development Goals</Link
        > (SDGs).
    </p>

    <ButtonGroup class="mt-8">
        <LinkButton href={COMMUNITY_LINK} variant="secondary-inverted">Learn more</LinkButton>
        <LinkButton href="/contribute" variant="secondary-inverted">Get involved</LinkButton>
    </ButtonGroup>
</div>

<p class="text-center text-base uppercase">Our three pillars:</p>

<div
    class="mx-auto mt-8 grid max-w-lg justify-items-center gap-4 text-center md:max-w-none md:grid-cols-3 lg:gap-8"
>
    <div class="border-being flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-being">Tools</Heading>
        <p class="my-4 flex-1">
            We are creating an open source library of tools that both people and organisations can
            use to develop the skills outlined by the IDG framework. Here you can find methods,
            workshops and resources relevant to the skills you want to practice.
        </p>
        <Link href="https://idg.tools" variant="orange">Explore the IDG Toolkit</Link>
    </div>

    <div class="border-collaborating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-collaborating">Hubs</Heading>
        <p class="my-4 flex-1">
            With more than 100 IDG Hubs, this is an emerging network eager to participate, explore
            and co-create. Join local events, connect with the global community and learn together.
        </p>
        <Link href={COMMUNITY_LINK} variant="orange">Find your community</Link>
    </div>

    <div class="border-relating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-relating">Stories</Heading>
        <p class="my-4 flex-1">
            Read stories of how people around the world are using the IDG framework in practice.
            Learn from others and try it with your local hub. Share your own story and help make the
            IDG community even better!
        </p>
        <Link href="#stories" variant="orange">Inspire and get inspired</Link>
    </div>
</div>

<Stories {content} />
