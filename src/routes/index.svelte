<script lang="ts">
    import LinkButton from '$components/LinkButton.svelte'
</script>

<!-- Design link: https://www.figma.com/file/dj1eaMaWVKt18tfFengORu/better?node-id=2%3A493 -->

<div class="px-8 pt-20 text-stone-50">
    <h1 class="text-6xl tracking-wider">Get<br />Better.</h1>

    <div class="space-y-4 py-16">
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

    <LinkButton href="/onboarding" class="mx-auto mt-8 block">
        Less talk, let's go!
    </LinkButton>
</div>
