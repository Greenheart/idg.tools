<script lang="ts">
    import LinkButton from '$components/LinkButton.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
</script>

<Heading size={1}>Get better</Heading>

<!-- IDEA: Add IDG favicon -->
<!-- IDEA: Package app as an PWA, installable to the home screen -->

<div class="space-y-6 py-12">
    <p>
        IDG.tools helps you develop the skills to achieve the <Link
            href="https://sdgs.un.org/goals"
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

<div class="flex justify-center">
    <LinkButton href="/skills">Let's begin</LinkButton>
</div>
