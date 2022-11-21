<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import Tags from '$components/Tags.svelte'
    import { cx, getColor, pluralize } from '$lib/utils'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ story, dimensions, contributors, tags } = data)
</script>

<!-- IDEA: add breadcrumbs navigation component at the top -->

<Heading size={1}>{story.title}</Heading>

<div class="mx-auto max-w-3xl">
    <div
        class="mt-8 flex flex-wrap gap-4 gap-x-8 rounded-2xl bg-stone-50 p-4 text-stone-900 shadow-2xl"
    >
        <div>
            <p class="mb-2 text-sm uppercase">Published</p>
            <p class="font-bold">
                {new Date(story.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
            </p>
        </div>

        {#if dimensions?.length}
            <div>
                <p class="mb-2 text-sm uppercase">Dimensions</p>
                <div class="flex gap-1">
                    {#each dimensions as dimension}
                        {@const color = getColor(dimension.id)}
                        <span class={cx('px-2 py-1 text-sm text-white rounded-lg', color)}
                            >{dimension.name}</span
                        >
                    {/each}
                </div>
            </div>
        {/if}

        {#if tags?.length}
            <div>
                <p class="mb-2 text-sm uppercase">Tags</p>
                <!-- IDEA: Make Tags into clickable links that navigate back to the homepage and shows the content with only that content shown -->
                <Tags {tags} size="md" class="!gap-1" />
            </div>
        {/if}

        <div>
            <p class="mb-2 text-sm uppercase">
                {pluralize('Contributor', contributors.length, false)}
            </p>
            <div class="flex space-x-1">
                {#each contributors as { link, name }, i}
                    {#if link}
                        <Link href={link} variant="black">{name}</Link>
                    {:else}
                        <span>{name}</span>
                    {/if}<span class="!m-0">{i < contributors.length - 1 ? ',' : ''}</span>
                {/each}
            </div>
        </div>
    </div>

    {#if story.intro}
        <Markdown source={story.intro} class="prose-p:!leading-10 mt-8 !text-3xl" />
    {/if}

    <img src={story.image} alt={story.imageAlt} class="my-8 rounded-2xl" />

    <Markdown source={story.story} formatting="article" />

    <div class="mt-16 flex justify-center">
        <LinkButton href="/#stories" variant="primary">See all stories</LinkButton>
    </div>
</div>
