<script lang="ts">
    import Markdown from '$components/Markdown.svelte'

    import type { Tool } from '$lib/types'

    export let tool: Tool
</script>

<h1 class="pt-8 text-5xl tracking-wider md:pt-16">Today's focus</h1>

<h2 class="py-4 text-xl font-semibold">{tool.name}</h2>

<Markdown source={tool.description} class="pt-4" />
<pre>{tool.description}</pre>

<div class="my-8 rounded-2xl bg-white p-4 text-stone-900">
    <h3 class="pb-2 text-xl font-bold">Your challenge</h3>
    <Markdown source={tool.challenge} />
    <pre>{tool.challenge}</pre>
</div>

<h3 class="pb-2 text-xl font-bold">Want to learn more?</h3>
<Markdown source={tool.resource} />
<pre>{tool.resource}</pre>
