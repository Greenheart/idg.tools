<script lang="ts">
    import { fly } from 'svelte/transition'

    import LinkButton from '$components/LinkButton.svelte'
    import { onMount } from 'svelte'

    let ready = false
    onMount(() => (ready = true))
</script>

<h1 class="px-8 pt-16 text-6xl tracking-wider md:pt-20">
    Get<br />Better.
</h1>

{#if ready}
    <div class="space-y-6 py-12 md:py-16">
        <p in:fly={{ y: -30, delay: 500, duration: 1000 }}>
            Inner Development Goals (IDGs) are the skills we all need to achieve
            the UN Sustainable Development Goals (SDGs).
        </p>
        <p in:fly={{ y: -30, delay: 1200, duration: 1000 }}>
            With this app, you get daily bite-sized challenges to develop these
            skills. You pick the skills you want to develop, and we lead you
            there!
        </p>
        <p in:fly={{ y: -30, delay: 2000, duration: 1000 }}>
            Every day you’ll get find a short lesson, a challenge, and an
            article to learn a bit more more — simple, right?
        </p>
    </div>

    <div
        in:fly={{ y: -10, delay: 2700, duration: 1000 }}
        class="mx-auto flex justify-center px-8"
    >
        <LinkButton href="/focus">Less talk, let's go!</LinkButton>
    </div>
{/if}
