<script lang="ts" context="module">
    import { BASE_URL, DEFAULT_OG_IMAGE } from '$lib/constants'
    const DEFAULT_IMAGE = [
        {
            url: DEFAULT_OG_IMAGE,
            width: 1200,
            height: 736,
        },
    ]
</script>

<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import Breadcrumbs from '$shared/components/Breadcrumbs.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import Picture from '$shared/components/Picture.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'
    import Divider from '$shared/components/Divider.svelte'
    import { page } from '$app/stores'

    import type { PageData } from './$types'
    import StoryMetadata from '$components/StoryMetadata.svelte'
    import Meta from '$components/Meta.svelte'
    import { truncateText } from '$shared/utils'
    export let data: PageData
    $: ({ story, dimensions, contributors, tags, prev, next } = data)

    $: intro = truncateText(story.intro ?? story.story, 300)
    const url = $page.url.toString()

    // NOTE: Until major platforms and apps support webp for OG images, we need to serve OG images in jpg format.
    // NOTE: This assumes images have been correctly optimized as part of the build process.
    $: images = story.image
        ? [{ url: BASE_URL + story.image.replace('.webp', '.jpg') }]
        : DEFAULT_IMAGE
</script>

<Meta title={story.title} description={intro} {url} {images} />

<Breadcrumbs sections={[{ text: 'Stories', link: '/#stories' }, { text: story.title }]} />

<Heading size={1} class="text-collaborating pt-8">{story.title}</Heading>

<div class="mx-auto max-w-3xl">
    <StoryMetadata {story} {dimensions} {contributors} {tags} />

    {#if story.intro}
        <Markdown source={story.intro} class="mt-8 !text-2xl" />
    {/if}

    <Picture
        src={story.image}
        alt={story.imageAlt}
        sources={[{ srcset: story.image.replace(/\.webp$/, '.jpg'), type: 'image/jpg' }]}
        class="mx-auto mt-8 mb-2 w-full"
        width={768}
        height={576}
    />
    <p class="mb-8 text-center text-sm italic">{story.imageAlt}</p>

    <Markdown source={story.story} formatting="article" />

    <Divider class="my-16" />

    <Heading class="text-center">More stories</Heading>

    <div class="mt-8 flex items-start space-x-8">
        {#if prev}
            <div class="flex flex-1 items-center justify-start space-x-2">
                <Arrow left /><Link href={prev.link} class="text-left" variant="black"
                    >{prev.title}</Link
                >
            </div>
        {/if}
        {#if next}
            <div class="flex flex-1 items-center justify-end space-x-2">
                <Link href={next.link} class="text-right" variant="black">{next.title}</Link><Arrow
                    right
                />
            </div>
        {/if}
    </div>

    <div class="mt-16 flex justify-center">
        <LinkButton href="/#stories" variant="primary">See all stories</LinkButton>
    </div>
</div>
