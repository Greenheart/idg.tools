<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import LinkButton from '$components/LinkButton.svelte'
    import Markdown from '$components/Markdown.svelte'
    import Tags from '$components/Tags.svelte'
    import { cx, getColor } from '$lib/utils'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ story, dimensions, contributors, tags } = data)
</script>

<Heading size={1}>{story.title}</Heading>

<div class="flex items-center mt-4">
    <span>{new Date(story.publishedAt).toLocaleDateString('sv-SE')}</span>
    {#if dimensions?.length}
        <span class="px-1 md:px-2">&middot;</span>
        <div class="flex space-x-2">
            {#each dimensions as dimension}
                {@const color = getColor(dimension.id)}
                <span
                    class={cx('px-2 py-1 text-sm text-white rounded-lg', color)}
                    >{dimension.name}</span
                >
            {/each}
        </div>
    {/if}
    {#if tags?.length}
        <span class="px-1 md:px-2">&middot;</span>
        <Tags {tags} inverted size="md" />
    {/if}
</div>

<img src={story.image} alt={story.imageAlt} class="mt-4 rounded-2xl" />

{#if story.intro}
    <Markdown source={story.intro} class="pt-8 font-bold" />
{/if}

<Markdown source={story.story} class="pt-8" />

<Heading class="pt-8 pb-2">Contributors</Heading>
<div class="flex space-x-1 text-lg">
    {#each contributors as { link, name }, i}
        {#if link}
            <Link href={link}>{name}</Link>
        {:else}
            <span>{name}</span>
        {/if}{i < contributors.length - 1 ? ',' : ''}
    {/each}
</div>

<div class="mt-16 flex justify-center">
    <LinkButton href="/stories" variant="primary">See all stories</LinkButton>
</div>
