<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Link from '$components/Link.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ stories } = data)
</script>

<Heading size={1}>Stories from the IDG community</Heading>

<!-- IDEA: Show Tool card for each story -->

<div class="grid gap-4 mt-16">
    {#each stories as story}
        <Link href={`/stories/${story.link}`}>{story.title}</Link>
    {/each}
</div>

<!-- IDEA: Make it possible to explore stories based on dimensions and contributors -->
