<script lang="ts">
    import Skills from '$components/Skills.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import LinkButton from '$components/LinkButton.svelte'

    import type { Content } from '$shared/types'

    export let content: Content
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

<div class="mx-auto mt-6 flex flex-col items-center px-8">
    <LinkButton href="/explore">Continue</LinkButton>
</div>
