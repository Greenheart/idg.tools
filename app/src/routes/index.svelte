<script lang="ts">
    import LinkButton from '$components/LinkButton.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
</script>

<Heading size={1}>Get<br />Better.</Heading>

<!-- IDEA: Add IDG favicon -->
<!-- IDEA: Package app as an PWA, installable to the home screen -->

<div class="space-y-6 py-12">
    <p>
        If you’re like us, you want to be a good person. You want to get better
        for yourself, your loved ones, and the planet.
    </p>

    <p>
        What better way to start than with the <Link
            href="https://www.innerdevelopmentgoals.org"
            class="font-bold underline"
        >
            Inner Development Goals
        </Link> (IDGs) - skills we all need to practice to achieve the <Link
            href="https://sdgs.un.org/goals"
            class="font-bold underline"
        >
            Sustainable Development Goals
        </Link> (SDGs). It’s a lot of acronyms, but we promise it’s good stuff.
    </p>

    <p>
        IDG.tools helps you practice the IDG skills. We’re a non-profit, open
        source community, always learning and improving this library of
        knowledge, together.
    </p>
</div>

<div class="flex justify-center">
    <LinkButton href="/skills">Let's begin</LinkButton>
</div>
