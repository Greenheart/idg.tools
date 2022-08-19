<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'
    import DetailedRelevantSkills from '$components/DetailedRelevantSkills.svelte'
    import Resources from '$components/Resources.svelte'

    import type { Content, Tool } from '$shared/types'
    import LinkButton from '$components/LinkButton.svelte'
    import Tags from '$components/Tags.svelte'

    export let tool: Tool
    export let content: Content
</script>

<Heading class="text-5xl">{tool.name}</Heading>

<Tags {tool} {content} visible={3} class="pt-4" inverted />

<Markdown source={tool.description} class="pt-4 text-lg" />

<div class="mt-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2 text-2xl">Try it today</Heading>
    <Markdown source={tool.actions} variant="inverted" />
</div>

<Heading class="pt-8 pb-2">Skill relevancy</Heading>
<DetailedRelevantSkills {tool} {content} />

{#if tool.resources}
    <Heading class="pt-8 pb-2">Research and resources</Heading>
    <Resources {tool} class="mb-8" />
{/if}

<div class="flex justify-center">
    <LinkButton href="https://github.com/Greenheart/idg.tools/discussions">
        Help improve this tool
    </LinkButton>
</div>

<!-- IDEA: Maybe add specific chat room for each IDG skill, allowing people to discuss this IDG with others -->
<!-- IDEA: Probably even better, show a CTA at the bottom of each tool suggesting them to join the IDG community and learn together with others -->
