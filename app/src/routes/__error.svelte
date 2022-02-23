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
    import H from '$components/H.svelte'

    export let message: string | undefined
    export let status: number | undefined
</script>

{#if status === 404}
    <H size={2} class="mb-8">Not found</H>
    <LinkButton href="/explore" size="lg">Explore IDG.tools</LinkButton>
{:else}
    <H size={2} class="mb-8">Oops! Something went wrong</H>
    <p>HTTP {status}</p>
    <p>{message}</p>
{/if}
