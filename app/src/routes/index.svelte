<script lang="ts">
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'

    import LinkButton from '$components/LinkButton.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'

    let ready = false
    onMount(() => (ready = true))
</script>

<Heading size={1}>Get<br />Better.</Heading>

<!-- IDEA: Add IDG favicon -->

{#if ready}
    <div class="space-y-6 py-12">
        <p in:fly={{ y: -30, delay: 300, duration: 1000 }}>
            If you’re like us, you want to be a good person. You want to get
            better for yourself, your loved ones, and the planet.
        </p>

        <p in:fly={{ y: -30, delay: 1100, duration: 1000 }}>
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

        <p in:fly={{ y: -30, delay: 1900, duration: 1000 }}>
            IDG.tools helps you practice the IDG skills. We’re a non-profit,
            open source community, always learning and improving this library of
            knowledge, together.
        </p>
    </div>

    <div
        in:fly={{ y: -20, delay: 2700, duration: 1000 }}
        class="flex justify-center"
    >
        <LinkButton href="/skills">Let's begin</LinkButton>
    </div>
{/if}
