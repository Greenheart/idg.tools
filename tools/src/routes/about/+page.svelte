<script>
    import Divider from '$shared/components/Divider.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import { COMMUNITY_LINK } from '$shared/constants'
</script>

<Heading size={1} class="text-collaborating">About the IDG toolkit</Heading>

<!-- TODO: maybe add a short intro here -->

<!-- TODO: Maybe showcase the core team -->

<!-- IDEA: Maybe explain the IDGs and the mission and vision on this page -->

<!-- TODO: Maybe replace this heading with a short intro paragraph, or remove it entirely -->
<p class="mt-8 text-center text-base uppercase">Our three pillars:</p>

<div
    class="mx-auto mt-8 grid max-w-lg justify-items-center gap-4 text-center md:max-w-none md:grid-cols-3 lg:gap-8"
>
    <div class="border-being flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-being">Tools</Heading>
        <p class="my-4 flex-1">
            <!-- TODO: don't push as strongly for scientifically validated. Use the suggestion email instead -->
            We are creating an open source library of scientifically-validated tools to develop the skills
            outlined by the IDG framework. Here you can find methods, workshops and resources relevant
            to the skills you want to practice.
        </p>
        <Link href="/#explore" variant="pink">Explore tools</Link>
    </div>

    <div class="border-collaborating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-collaborating">Co-creation</Heading>
        <p class="my-4 flex-1">
            This toolkit is created by and for the community. You are welcome to suggest
            improvements, new tools or even design and develop the app. Read the principles of
            tools, and how to join the co-creation.
        </p>
        <!-- TODO: add contributing link relevant for tools -->
        <Link href="#" variant="pink">Get involved</Link>
    </div>

    <div class="border-relating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-relating">Community</Heading>
        <p class="my-4 flex-1">
            With almost 100 IDG Hubs, these tools are used by an emerging network eager to
            participate, explore and co-create. Join local events, connect with the global community
            and learn together.
        </p>
        <Link href={COMMUNITY_LINK} variant="pink">Find your community</Link>
    </div>
</div>

<Divider class="my-16" />

<!-- TODO: maybe show principles and governance for the IDG toolkit down here, with support for anchor links -->
