<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import Breadcrumbs from '$shared/components/Breadcrumbs.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import Tags from '$components/Tags.svelte'
    import { cx, getColor, pluralize } from '$lib/utils'
    import Arrow from '$shared/icons/Arrow.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ story, dimensions, contributors, tags, prev, next } = data)
</script>

<Breadcrumbs sections={[{ text: 'Stories', link: '/#stories' }, { text: story.title }]} />

<Heading size={1} class="pt-8">{story.title}</Heading>

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
                <p class="mb-2 text-sm uppercase">
                    {pluralize('Dimension', dimensions.length, false)}
                </p>
                <div class="flex flex-wrap gap-1">
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
                <p class="mb-2 text-sm uppercase">{pluralize('Tag', tags.length, false)}</p>
                <!-- IDEA: Make Tags into clickable links that navigate back to the homepage and shows the content with only that content shown -->
                <Tags {tags} size="md" class="!gap-1" />
            </div>
        {/if}

        <div>
            <p class="mb-2 text-sm uppercase">
                {pluralize('Contributor', contributors.length, false)}
            </p>
            <div class="flex flex-wrap space-x-1 whitespace-nowrap">
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

    <!-- TODO: Make intro image responsive to follow other content width -->
    <!-- TODO: Keep larger font sizes for a bit longer, scale the same way as tools are doing -->

    <img src={story.image} alt={story.imageAlt} class="my-8 rounded-2xl" />

    <Markdown source={story.story} formatting="article" />

    <div class="my-16 flex items-center justify-center gap-2">
        <hr class="h-1 w-full" />
        <span>|</span>
        <span>|</span>
        <span>|</span>
        <hr class="h-1 w-full" />
    </div>

    <Heading class="text-center">More stories</Heading>

    <div class="mt-8 flex items-start space-x-8">
        {#if prev}
            <div class="flex flex-1 items-center justify-start space-x-2">
                <Arrow left /><Link href={prev.link} class="text-left">{prev.title}</Link>
            </div>
        {/if}
        {#if next}
            <div class="flex flex-1 items-center justify-end space-x-2">
                <Link href={next.link} class="text-right">{next.title}</Link><Arrow right />
            </div>
        {/if}
    </div>

    <div class="mt-16 flex justify-center">
        <LinkButton href="/#stories" variant="primary">See all stories</LinkButton>
    </div>
</div>
