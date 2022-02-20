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

    export let message: string | undefined
    export let status: number | undefined
</script>

{#if status === 404}
    <!-- TODO: Add styled heading variants to make them easier to use across the app -->
    <h2 class="mb-8">Not found</h2>
    <LinkButton href="/explore" size="lg">Explore IDG.tools</LinkButton>
{:else}
    <h2>Oops! Something went wrong</h2>
    <p>HTTP {status}</p>
    <p>{message}</p>
{/if}
