<script lang="ts">
    import { truncateText } from '$lib/utils'
    import { getTag } from '$shared/content-utils'
    import type { Story, CommunityContent } from '$shared/types'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import Tags from './Tags.svelte'

    export let story: Story
    export let content: CommunityContent

    $: intro = truncateText(story.intro ?? story.story, 300)

    let tags = story.tags.map((tagId) => getTag(tagId, content))
</script>

<Link href={`/stories/${story.link}`} variant="black" unstyled class="group grid p-2 text-stone-50">
    <div class="grid aspect-[3/2] overflow-hidden">
        <img
            src={story.image}
            alt={story.imageAlt}
            class="h-full w-full transform-gpu object-cover shadow-lg transition-transform duration-300 group-hover:scale-105"
            width={520}
            height={346}
            loading="lazy"
        />
    </div>
    <Heading class="pt-3 pb-2 group-hover:underline">{story.title}</Heading>
    <div class="flex items-center pb-2">
        <span>{new Date(story.publishedAt).toLocaleDateString('sv-SE')}</span>
        {#if tags.length}
            <span class="px-1 md:px-2">&middot;</span>
            <Tags {tags} visible={3} inverted />
        {/if}
    </div>
    <p>{intro}</p>
</Link>
