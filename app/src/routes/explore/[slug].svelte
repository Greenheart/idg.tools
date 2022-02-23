<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'
    import Skills from '$components/Skills.svelte'

    import type { Content, Tool } from '$lib/types'

    export let tool: Tool
    export let content: Content
</script>

<Heading size={1} class="pt-4">{tool.name}</Heading>

<!-- TODO: List relevant categories -->
<Skills {tool} {content} class="pt-8" />

<Markdown source={tool.description} class="pt-8" />

<div class="my-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2">Your challenge</Heading>
    <Markdown source={tool.challenge} variant="inverted" />
</div>

<Heading class="pb-2">Want to learn more?</Heading>
<Markdown source={tool.resources} />

<!-- IDEA: Maybe add specific chat room for each IDG skill, allowing people to discuss this IDG with others -->
<!-- IDEA: Probably even better, show a CTA at the bottom of each tool suggesting them to join the IDG community and learn together with others -->
