<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'
    import { cx, getColor } from '$lib/utils'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ story, dimensions, contributors } = data)
</script>

<Heading size={1}>{story.title}</Heading>

<div class="flex items-center mt-4">
    <span>{new Date(story.publishedAt).toLocaleDateString('sv-SE')}</span>
    <span class="px-1 md:px-2">&middot;</span>
    <div class="flex space-x-2">
        {#each dimensions as dimension}
            {@const color = getColor(dimension.id)}
            <span class={cx('px-2 py-1 text-sm text-white rounded-lg', color)}
                >{dimension.name}</span
            >
        {/each}
    </div>
</div>

{#if story.intro}
    <Markdown source={story.intro} class="pt-4 text-lg font-bold" />
{/if}

<Markdown source={story.story} class="pt-4 text-lg" />

<!-- 
<div class="mt-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2 text-2xl">How to practice</Heading>
    <Markdown source={tool.actions} variant="inverted" />
</div> -->

<Heading class="pt-8 pb-2">Contributors</Heading>
<span>{contributors.map((c) => c.name).join(', ')}</span>
