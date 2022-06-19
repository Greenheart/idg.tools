<script lang="ts">
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'
    import DetailedRelevantSkills from '$components/DetailedRelevantSkills.svelte'

    import type { Content, Tool } from '$shared/types'

    export let tool: Tool
    export let content: Content
</script>

<Heading class="text-5xl">{tool.name}</Heading>

<Markdown source={tool.description} class="pt-8 text-lg" />

<div class="my-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2 text-2xl">Try it today</Heading>
    <Markdown source={tool.actions} variant="inverted" />
</div>

<Heading class="pt-8 pb-2">Skill relevancy</Heading>
<DetailedRelevantSkills {tool} {content} />

<Heading class="pt-8 pb-2">Research and resources</Heading>
<Markdown source={tool.resources} class="mb-8" />

<Link href="https://github.com/Greenheart/idg.tools/discussions" variant="pink">
    Help improve this tool
</Link>

<!-- IDEA: Maybe add specific chat room for each IDG skill, allowing people to discuss this IDG with others -->
<!-- IDEA: Probably even better, show a CTA at the bottom of each tool suggesting them to join the IDG community and learn together with others -->
