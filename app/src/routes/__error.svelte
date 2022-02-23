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

{#if status === 404}
    <Heading class="mb-8">Not found</Heading>
    <LinkButton href="/explore" size="lg">Explore IDG.tools</LinkButton>
{:else}
    <Heading class="mb-8">Oops! Something went wrong</Heading>
    <p>HTTP {status}</p>
    <p>{message}</p>
{/if}
