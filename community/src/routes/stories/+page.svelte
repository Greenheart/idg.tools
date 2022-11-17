<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Link from '$components/Link.svelte'
    import Stories from '$components/Stories.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ content } = data)
</script>

<Heading size={1}>Stories from the IDG community</Heading>

<!-- IDEA: combine this page with the landing page, and redirect from /stories to / -->
<!-- IDEA: We could show the heading above first, and then the featured stories, and finally list all other stories, filtering out the featured ones -->
<!-- IDEA: If filters are applied, the featured stories will be hidden and only the relevant stories are shown, sorted by most relevant first -->

<div class="grid gap-4 mt-16">
    <Stories stories={content.stories} {content} />
</div>

<!-- IDEA: Make it possible to explore stories based on dimensions and contributors -->
