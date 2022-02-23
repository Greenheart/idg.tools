<script context="module" lang="ts">
    import type { ErrorLoadInput } from '@sveltejs/kit'

    export const load = ({ error, status }: ErrorLoadInput) => ({
        props: {
            message: error?.message,
            status,
        },
    })
</script>

<script lang="ts">
    import LinkButton from '$components/LinkButton.svelte'
    import Heading from '$components/Heading.svelte'

    export let message: string | undefined
    export let status: number | undefined
</script>

<div class="flex flex-col items-center justify-center">
    {#if status === 404}
        <Heading class="mb-8">Sorry, this page does not exist</Heading>
        <LinkButton href="/explore" size="lg">Explore IDG.tools</LinkButton>
    {:else}
        <Heading class="mb-8">Oops! Something went wrong</Heading>
        <p class="mb-8">
            <span>HTTP {status} - </span>
            {message}
        </p>
        <LinkButton href="/explore" size="lg">Explore IDG.tools</LinkButton>
    {/if}
</div>
