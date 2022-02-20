<script lang="ts">
    import DocumentRenderer from '$components/DocumentRenderer.svelte'
    import type { Tool } from '$lib/types'

    export let tool: Tool
</script>

<h1 class="pt-8 text-5xl tracking-wider md:pt-16">Today's focus</h1>

<h2 class="py-4 text-xl font-semibold">{tool.name}</h2>

<DocumentRenderer document={tool.description} class="pt-4" />

<div class="my-8 rounded-2xl bg-white p-4 text-stone-900">
    <h3 class="pb-2 text-xl font-bold">Your challenge</h3>
    <p>{tool.challenge}</p>
</div>

<h3 class="pb-2 text-xl font-bold">Want to learn more?</h3>
<p>{tool.resource}</p>
