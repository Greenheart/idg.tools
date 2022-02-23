<script lang="ts">
    import H from '$components/H.svelte'
    import Markdown from '$components/Markdown.svelte'

    import type { Tool } from '$lib/types'

    export let tool: Tool
</script>

<H size={1} class="pt-4">Today's focus</H>

<h2 class="py-4 text-xl font-semibold">{tool.name}</h2>

<!-- TODO: List relevant categories -->
<!-- TODO: List relevant skills -->

<Markdown source={tool.description} class="pt-4" />

<div class="my-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <h2 class="pb-2 text-xl font-bold">Your challenge</h2>
    <Markdown source={tool.challenge} variant="inverted" />
</div>

<h2 class="pb-2 text-xl font-bold">Want to learn more?</h2>
<Markdown source={tool.resources} />
