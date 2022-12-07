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
    import { page } from '$app/stores'

    import type { PageData } from './$types'
    import StoryMetadata from '$components/StoryMetadata.svelte'
    import Divider from '$components/Divider.svelte'
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

<Heading size={1} class="pt-8">{story.title}</Heading>

<div class="mx-auto max-w-3xl">
    <StoryMetadata {story} {dimensions} {contributors} {tags} />

    {#if story.intro}
        <Markdown source={story.intro} class="mt-8 !text-2xl" />
    {/if}

    <!-- TODO: Make intro image responsive to follow other content width -->
    <!-- TODO: Keep larger font sizes for a bit longer, scale the same way as tools are doing -->
    <!-- This layout issue is caused when font sizes decreases for `prose` content, which no longer fills the full width of parent container -->

    <Picture
        src={story.image}
        alt={story.imageAlt}
        sources={[{ srcset: story.image.replace(/\.webp$/, '.jpg'), type: 'image/jpg' }]}
        class="mx-auto mt-8 w-full rounded-2xl shadow-2xl"
        width={768}
        height={576}
    />
    <p class="mt-2 mb-8 text-center text-sm italic text-stone-50">{story.imageAlt}</p>

    <Markdown source={story.story} formatting="article" />

    <Divider />

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
