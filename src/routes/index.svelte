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
            Get daily bite-sized challenges to help you become a better version
            of yourself. You choose where you want to improve, and we lead you
            there!
        </p>
        <p in:fly={{ y: -30, delay: 1200, duration: 1000 }}>
            Every day you’ll get find a short lesson, a challenge, and an
            article to learn more. Just an intro and some resources to dig
            deeper - if you want to.
        </p>
        <p in:fly={{ y: -30, delay: 2000, duration: 1000 }}>
            You can change the topics you’re interested in or request new topics
            from us. And best of all - it’s all free!
        </p>
    </div>

    <div
        in:fly={{ y: -10, delay: 2700, duration: 1000 }}
        class="mx-auto flex justify-center px-8"
    >
        <LinkButton href="/focus">Less talk, let's go!</LinkButton>
    </div>
{/if}
