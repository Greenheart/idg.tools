<script lang="ts">
    import Button from '$components/Button.svelte'
    import LinkButton from '$components/LinkButton.svelte'
    import Screen from '$components/Screen.svelte'
</script>

<Screen>
    <h1 class="mt-20 text-6xl tracking-wider" slot="header">
        Better<br />Onboarding
    </h1>

    <div class="space-y-4 py-16" slot="main">
        <p>Choose topics and accept notifications.</p>
        <p>It doesn't have to be harder than that.</p>
    </div>

    <LinkButton href="/" class="my-12 place-self-center" slot="footer">
        Choose topics
    </LinkButton>
</Screen>
