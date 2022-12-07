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

<Tags {tags} visible={3} class="pt-4" inverted size="md" />

<div class="gap-8 lg:grid lg:grid-cols-[4fr_2fr]">
    <div>
        {#if tool.intro}
            <Markdown source={tool.intro} class="pt-4 font-bold" />
        {/if}

        <Markdown source={tool.description} formatting="limited" class="pt-8" />
    </div>
    <div>
        <Heading class="pb-2 pt-4">Most relevant skills</Heading>
        <DetailedRelevantSkills {skills} relevancy={tool.relevancy} />
    </div>
</div>

<div class="xs:p-8 mx-auto mt-8 grid max-w-max rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2 text-2xl">How to practice</Heading>
    <Markdown source={tool.actions} variant="inverted" formatting="limited" />
</div>

{#if tool.resources}
    <Heading class="pt-8 pb-2">Research and resources</Heading>
    <Resources {tool} />
{/if}

<div class="mt-8">
    <FeedbackForm />
</div>

<div class="mt-8 flex justify-center">
    <Link href="/#explore" variant="pink">See more tools</Link>
</div>
