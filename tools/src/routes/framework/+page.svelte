<script lang="ts">
    import Divider from '$shared/components/Divider.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import IDGColors from '$shared/components/IDGColors.svelte'
    import {
        COMMUNITY_LINK,
        FRAMEWORK_LINK,
        GITHUB_LINK,
        HOW_TO_CONTRIBUTE_LINK,
        IDG_PDF_TOOLKIT,
    } from '$shared/constants'

    import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'

    const url = $page.url.toString()
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" {url} />

<Heading size={1} class="text-collaborating">IDG Framework</Heading>

<!-- NOTE: Maybe have some kind of intro text here, linking to the full report etc -->
<!-- <div class="py-12 text-lg">
    <p>
        The <Link href="https://innerdevelopmentgoals.org" variant="black"
            >Inner Development Goals</Link
        > is a non-profit initiative to bring the power of inner development to all global challenges
        faced by humanity.
    </p>
    <p class="mt-4">
        The <Link href={FRAMEWORK_LINK} variant="black">IDG framework</Link> describes the collective
        inner skills needed to deal with complex global challenges, such as the Sustainable Development
        Goals. The IDG Toolkit aims to be a library of useful methods and approaches to practice these
        skills.
    </p>
</div> -->

<div class="grid gap-4 pt-12">
    <div class="flex aspect-video items-center justify-between bg-white shadow-md">
        <IDGColors />
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="400" height="220" />
        <IDGColors />
    </div>

    <div class="flex aspect-video items-center justify-between bg-white shadow-md">
        <IDGColors />
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="400" height="220" />
        <IDGColors />
    </div>
</div>

<!-- <div
    class="mx-auto grid max-w-lg justify-items-center gap-4 text-center md:max-w-none md:grid-cols-3 lg:gap-8"
>
    <div class="border-being flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-being">Open source</Heading>
        <p class="my-4 flex-1">
            This is an open source library of tools that both people and organizations can use to
            develop the skills outlined by the IDG framework. Here you can find methods, workshops
            and resources relevant to the skills you want to practice.
        </p>
        <Link href={GITHUB_LINK} variant="orange">Contribute on GitHub</Link>
    </div>

    <div class="border-collaborating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-collaborating">Co-creation</Heading>
        <p class="my-4 flex-1">
            The IDG toolkit is created by and for the community. You are welcome to suggest
            improvements, new tools or even design and develop the app. Read the principles of
            tools, and how to join the co-creation.
        </p>
        <Link href={HOW_TO_CONTRIBUTE_LINK} variant="orange">Get involved</Link>
    </div>

    <div class="border-relating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-relating">Community</Heading>
        <p class="my-4 flex-1">
            With more than 100 IDG Hubs, these tools are used by an emerging network eager to
            participate, explore and co-create. Join local events, connect with the global community
            and learn together.
        </p>
        <Link href={COMMUNITY_LINK} variant="orange">Find your community</Link>
    </div>
</div> -->

<Divider class="my-16" />
