<script lang="ts">
    import { fly } from 'svelte/transition'

    import LinkButton from '$components/LinkButton.svelte'
    import Screen from '$components/Screen.svelte'
</script>

<Screen>
    <h1 class="mt-20 text-6xl tracking-wider" slot="header">
        Get<br />Better.
    </h1>

    <div class="space-y-6 place-self-center py-16" slot="main">
        <p transition:fly={{ y: -50, delay: 500, duration: 1000 }}>
            <!-- <p transition:fade={{ delay: 1000, duration: 1000 }}> -->
            Get daily bite-sized challenges to help you become a better version of
            yourself. You choose where you want to improve, and we lead you there!
        </p>
        <p transition:fly={{ y: -40, delay: 1200, duration: 1000 }}>
            <!-- <p transition:fade={{ delay: 2000, duration: 1000 }}> -->
            Every day you’ll get find a short lesson, a challenge, and an article
            to learn more. Just an intro and some resources to dig deeper - if you
            want to.
        </p>
        <p transition:fly={{ y: -30, delay: 2000, duration: 1000 }}>
            <!-- <p transition:fade={{ delay: 3000, duration: 1000 }}> -->
            You can change the topics you’re interested in or request new topics
            from us. And best of all - it’s all free!
        </p>
    </div>

    <LinkButton
        href="/onboarding"
        class="my-12 place-self-center"
        slot="footer"
    >
        Less talk, let's go!
    </LinkButton>
</Screen>
