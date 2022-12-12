<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import Divider from '$shared/components/Divider.svelte'
    import DetailedRelevantSkills from '$components/DetailedRelevantSkills.svelte'
    import Resources from '$components/Resources.svelte'
    import FeedbackForm from '$components/FeedbackForm.svelte'
    import Tags from '$components/Tags.svelte'
    import Breadcrumbs from '$shared/components/Breadcrumbs.svelte'
    import Link from '$shared/components/Link.svelte'

    import { page } from '$app/stores'

    import type { PageData } from './$types'
    import Meta from '$components/Meta.svelte'
    import { truncateText } from '$shared/utils'
    export let data: PageData
    $: ({ tool, skills, tags } = data)
    $: intro = truncateText(tool.intro ?? tool.description, 300)

    const url = $page.url.toString()
</script>

<Meta title={tool.name} description={intro} {url} />

<Breadcrumbs sections={[{ text: 'Tools', link: '/#explore' }, { text: tool.name }]} />

<Heading size={1} class="text-collaborating pt-8">{tool.name}</Heading>

<Tags {tags} visible={3} class="pt-4" inverted size="md" />

{#if tool.intro}
    <Markdown source={tool.intro} class="pt-8 !text-2xl" />
{/if}

<Divider class="my-8" />

<Markdown source={tool.description} formatting="article" />

<div class="mt-8 bg-white p-4 text-black shadow-xl sm:p-8">
    <Heading class="pb-2 text-2xl">How to practice</Heading>
    <Markdown source={tool.actions} formatting="limited" />
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
    <Link href="/#explore" variant="pink">See more tools</Link>
</div>
