<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import DetailedRelevantSkills from '$components/DetailedRelevantSkills.svelte'
    import Resources from '$components/Resources.svelte'
    import FeedbackForm from '$components/FeedbackForm.svelte'
    import Tags from '$components/Tags.svelte'
    import Breadcrumbs from '$shared/components/Breadcrumbs.svelte'
    import Link from '$shared/components/Link.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ tool, skills, tags } = data)
</script>

<Breadcrumbs sections={[{ text: 'Tools', link: '/#explore' }, { text: tool.name }]} />

<Heading size={1} class="pt-8">{tool.name}</Heading>

<div class="mx-auto max-w-3xl">
    <Tags {tags} visible={3} class="pt-4" inverted size="md" />

    {#if tool.intro}
        <Markdown source={tool.intro} class="pt-4 font-bold" />
    {/if}

    <Markdown source={tool.description} formatting="limited" class="pt-8" />

    <div class="mt-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
        <Heading class="pb-2 text-2xl">How to practice</Heading>
        <Markdown source={tool.actions} variant="inverted" />
    </div>

    <Heading class="pt-8 pb-2">Most relevant skills</Heading>
    <DetailedRelevantSkills {skills} relevancy={tool.relevancy} />

    {#if tool.resources}
        <Heading class="pt-8 pb-2">Research and resources</Heading>
        <Resources {tool} />
    {/if}

    <div class="mt-8">
        <FeedbackForm />
    </div>

    <div class="mt-8 flex justify-center">
        <Link href="/" variant="pink">See more tools</Link>
    </div>
</div>
