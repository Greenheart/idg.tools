<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'

    import type { Tool } from '$lib/types'

    export let tool: Tool
</script>

<Heading size={1} class="pt-4">Today's focus</Heading>

<Heading class="py-4">{tool.name}</Heading>

<!-- TODO: List relevant categories -->
<!-- TODO: List relevant skills -->

<Markdown source={tool.description} class="pt-4" />

<div class="my-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2">Your challenge</Heading>
    <Markdown source={tool.challenge} variant="inverted" />
</div>

<Heading class="pb-2">Want to learn more?</Heading>
<Markdown source={tool.resources} />
