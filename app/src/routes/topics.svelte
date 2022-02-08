<script lang="ts">
    import Button from '$components/Button.svelte'
    import LinkButton from '$components/LinkButton.svelte'
    import Screen from '$components/Screen.svelte'
    import { AllTopics } from '$lib/topics'

    let selected: string[] = []

    const toggleTopic = (topic: string) => {
        if (selected.includes(topic)) {
            selected = selected.filter((t) => t !== topic)
        } else {
            selected = [...selected, topic]
        }
    }

    const reset = () => {
        selected = []
    }
</script>

<Screen>
    <h1 class="mt-20 text-6xl tracking-wider" slot="header">
        I want to<br />be more
    </h1>

    <div class="grid place-self-center py-16" slot="main">
        <div class="flex flex-wrap gap-2 pb-8">
            {#each AllTopics as topic}
                <Button
                    label={topic}
                    on:click={() => toggleTopic(topic)}
                    variant={selected.includes(topic) ? 'active' : 'primary'}
                    size="sm"
                />
            {/each}
        </div>

        <Button label="Reset" size="sm" on:click={reset} variant="secondary" />
    </div>

    <LinkButton
        href="/onboarding"
        class="my-12 place-self-center"
        slot="footer"
    >
        Choose topics
    </LinkButton>
</Screen>
