<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'
    import DetailedRelevantSkills from '$components/DetailedRelevantSkills.svelte'
    import Resources from '$components/Resources.svelte'
    import FeedbackForm from '$components/FeedbackForm.svelte'
    import Tags from '$components/Tags.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ tool, skills, tags } = data)
</script>

<Heading size={1}>{tool.name}</Heading>

<Tags {tags} visible={3} class="pt-4" inverted />

{#if tool.intro}
    <Markdown source={tool.intro} class="pt-4 text-lg font-bold" />
{/if}

<Markdown source={tool.description} class="pt-4 text-lg" />

<div class="mt-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2 text-2xl">How to practice</Heading>
    <Markdown source={tool.actions} variant="inverted" />
</div>

<Heading class="pt-8 pb-2">Skill relevancy</Heading>
<DetailedRelevantSkills {skills} relevancy={tool.relevancy} />

{#if tool.resources}
    <Heading class="pt-8 pb-2">Research and resources</Heading>
    <Resources {tool} />
{/if}

<div class="mt-8">
    <FeedbackForm />
</div>
