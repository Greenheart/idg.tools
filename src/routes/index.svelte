<script lang="ts">
    import LinkButton from '$components/LinkButton.svelte'
    import Screen from '$components/Screen.svelte'
</script>

<Screen>
    <h1 class="mt-20 text-6xl tracking-wider" slot="header">
        Get<br />Better.
    </h1>

    <div class="space-y-4 place-self-center py-16" slot="main">
        <p>
            Get daily bite-sized challenges to help you become a better version
            of yourself. You choose where you want to improve, and we lead you
            there!
        </p>
        <p>
            Every day you’ll get find a short lesson, a challenge, and an
            article to learn more. Just an intro and some resources to dig
            deeper - if you want to.
        </p>
        <p>
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
