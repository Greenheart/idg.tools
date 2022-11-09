<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Link from '$components/Link.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ events } = data)
</script>

<Heading size={1}>Upcoming events for the IDG community</Heading>

<!-- IDEA: Show Tool card for each event -->

<div class="grid gap-4 mt-16">
    {#each events as event}
        <Link href={`/events/${event.link}`}>{event.name}</Link>
    {/each}
</div>

<!-- IDEA: Make it possible to explore events based on dimensions and other filters -->
