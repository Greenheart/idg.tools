<script lang="ts">
    import Skills from '$components/Skills.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import LinkButton from '$components/LinkButton.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ content } = data)
</script>

<Heading size={1}>Get better</Heading>

<!-- IDEA: Add IDG favicon -->
<!-- IDEA: Package app as an PWA, installable to the home screen -->

<div class="space-y-4 py-12">
    <p>
        IDG.tools helps you develop the skills to achieve the <Link
            href="https://sdgs.un.org/goals#goals"
            class="font-bold underline"
        >
            SDGs.
        </Link>
    </p>

    <p>
        We’re a non-profit, open source community, always learning and improving
        this library of knowledge, together.
    </p>
</div>

<Skills {content} />

<div class="mx-auto mt-6 flex flex-col items-center space-y-6 px-8 text-center">
    <LinkButton href="/explore">Continue</LinkButton>

    <span>Or...</span>

    <p>
        Learn more about the<br />
        <Link
            href="https://www.innerdevelopmentgoals.org/framework"
            class="mt-6 font-bold underline">Inner Development Goals</Link
        >
    </p>
</div>
