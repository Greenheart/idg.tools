<script lang="ts">
    import { browser } from '$app/environment'

    import IDGFramework from '$lib/IDGFramework.svelte'
</script>

<!-- TODO: See if it can work even during SSR -->
{#if browser}
    <IDGFramework />
{/if}
