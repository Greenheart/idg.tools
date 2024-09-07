<script>
    import { Divider, Heading, Link } from '$shared/components'
    import {
        FRAMEWORK_LINK,
        GITHUB_LINK,
        HUBS_NETWORKS_LINK,
        IDG_PDF_TOOLKIT,
    } from '$shared/constants'
</script>

<Heading size={1} class="text-collaborating">About the IDG Toolkit</Heading>

<div class="py-12 text-lg">
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
    <p class="mt-4">
        This is the public beta version of the IDG Toolkit. It is primarily based on the <Link
            href={IDG_PDF_TOOLKIT}
            variant="black">IDG Phase 2 Research Report</Link
        >, and research from <Link href="https://29k.org" variant="black">29k</Link>. We invite you
        <!-- TODO: Replace the span with link to contributing guide specifically for the toolkit -->
        to both <span>help improve and expand this open source toolkit</span>, and join the growing
        worldwide <Link href={HUBS_NETWORKS_LINK} variant="black">IDG community</Link> coming together
        to work on inner development for sustainable development.
    </p>
</div>

<div
    class="mx-auto grid max-w-lg justify-items-center gap-4 text-center md:max-w-none md:grid-cols-3 lg:gap-8"
>
    <div class="border-being flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-being">Open source</Heading>
        <p class="my-4 flex-1">
            This is an open source library of tools that both people and organisations can use to
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
        <Link href={GITHUB_LINK} variant="orange">Get involved</Link>
    </div>

    <div class="border-relating flex flex-col border bg-white p-4 shadow-md">
        <Heading size={2} class="text-relating">Community</Heading>
        <p class="my-4 flex-1">
            With more than 600 IDG Hubs, these tools are used by an emerging network eager to
            participate, explore and co-create. Join local events, connect with the global community
            and learn together.
        </p>
        <Link href={HUBS_NETWORKS_LINK} variant="orange">Explore Hubs & Networks</Link>
    </div>
</div>

<Divider class="my-16" />

<!--
    TODO: maybe show principles and governance for the IDG Toolkit down here, with support for anchor links
    These should likely have their own pages though, so they can easily be linked to.
-->
