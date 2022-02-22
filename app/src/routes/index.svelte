<script lang="ts">
    import { onMount } from 'svelte'
    import { fly } from 'svelte/transition'

    import LinkButton from '$components/LinkButton.svelte'
    import Link from '$components/Link.svelte'

    let ready = false
    onMount(() => (ready = true))
</script>

<h1 class="pt-4 text-6xl tracking-wider">Get<br />Better.</h1>

<!-- IDEA: Add IDG favicon -->
<!-- IDEA: Add IDG logo on the landing page -->

{#if ready}
    <!-- TODO: Add styled link variants to make them easier to use across the app -->
    <div class="space-y-8 py-12 text-lg">
        <p in:fly={{ y: -30, delay: 300, duration: 1000 }}>
            If you’re like us, you want to be a good person. You want to get
            better for yourself, your loved ones, and the planet.
        </p>

        <p in:fly={{ y: -30, delay: 1100, duration: 1000 }}>
            What better way to start than with the <Link
                href="https://www.innerdevelopmentgoals.org"
                class=" font-bold underline"
            >
                Inner Development Goals
            </Link> (IDGs) - skills we all need to practice to achieve the UN Sustainable
            Development Goals (SDGs). It’s a lot of acronyms, but we promise it’s
            good stuff.
        </p>

        <p in:fly={{ y: -30, delay: 1900, duration: 1000 }}>
            IDG.tools helps you practice the IDG skills. We’re a non-profit,
            open source community, always learning and improving this library of
            knowledge, together.
        </p>
    </div>

    <div
        in:fly={{ y: -10, delay: 2700, duration: 1000 }}
        class="grid items-center rounded-2xl bg-stone-50 p-4 text-stone-900"
    >
        <p class="pb-4 text-center font-bold">
            Welcome to IDG.tools - your inner development toolbox!
        </p>
        <LinkButton href="/focus" class="mx-auto block" variant="inverted">
            Let's begin
        </LinkButton>
    </div>
{/if}
