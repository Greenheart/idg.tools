<script lang="ts">
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import Breadcrumbs from '$shared/components/Breadcrumbs.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'

    import type { PageData } from './$types'
    import StoryMetadata from '$components/StoryMetadata.svelte'
    import Divider from '$components/Divider.svelte'
    export let data: PageData
    $: ({ story, dimensions, contributors, tags, prev, next } = data)
</script>

<Breadcrumbs sections={[{ text: 'Stories', link: '/#stories' }, { text: story.title }]} />

<Heading size={1} class="pt-8">{story.title}</Heading>

<div class="mx-auto max-w-3xl">
    <StoryMetadata {story} {dimensions} {contributors} {tags} />

    {#if story.intro}
        <Markdown source={story.intro} class="mt-8 !text-2xl" />
    {/if}

    <!-- TODO: Make intro image responsive to follow other content width -->
    <!-- TODO: Keep larger font sizes for a bit longer, scale the same way as tools are doing -->

    <!-- IDEA: use picture tag and a text description inside -->
    <img
        src={story.image}
        alt={story.imageAlt}
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
