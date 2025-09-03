<script lang="ts">
    import { Heading, Markdown, Divider, Breadcrumbs, Link } from '$shared/components'
    import DetailedRelevantSkills from '$components/DetailedRelevantSkills.svelte'
    import Resources from '$components/Resources.svelte'
    import Tags from '$components/Tags.svelte'

    import { page } from '$app/state'

    import type { PageData } from './$types'
    import Meta from '$components/Meta.svelte'
    import { truncateText } from '$shared/utils'
    interface Props {
        data: PageData
    }

    let { data }: Props = $props()
    let { tool, skills, tags } = $derived(data)
    let intro = $derived(truncateText(tool.intro ?? tool.description, 300))

    const url = page.url.toString()
</script>

<Meta title={tool.name} description={intro} {url} />

<Breadcrumbs sections={[{ text: 'Tools', link: '/#explore' }, { text: tool.name }]} />

<Heading size={1} class="text-collaborating pt-8">{tool.name}</Heading>

<Tags {tags} visible={3} class="pt-4" inverted size="md" />

{#if tool.intro}
    <Markdown source={tool.intro} class="pt-8 text-2xl!" />
{/if}

<Divider class="my-8" />

<Markdown source={tool.description} formatting="article" />

<div class="mt-8 bg-white p-4 text-black shadow-xl sm:p-8">
    <Heading class="pb-2 text-2xl">How to practice</Heading>
    <Markdown source={tool.actions} formatting="limited" />
</div>

<Heading class="pb-2 pt-8">Most relevant skills</Heading>
<DetailedRelevantSkills {skills} relevancy={tool.relevancy} />

{#if tool.resources}
    <Heading class="pb-2 pt-8">Research and resources</Heading>
    <Resources {tool} />
{/if}

<div class="mt-8 flex justify-center">
    <Link href="/#explore" variant="orange">See more tools</Link>
</div>
