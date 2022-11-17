<script lang="ts">
    import { truncateText } from '$lib/utils'
    import { getTag } from '$shared/content-utils'
    import type { Story, CommunityContent } from '$shared/types'
    import Heading from '$shared/components/Heading.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'
    import Link from '$shared/components/Link.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import Tags from './Tags.svelte'

    export let story: Story
    export let content: CommunityContent

    const introLength = 300
    $: intro = truncateText(story.intro ?? story.story, introLength)

    let tags = story.tags.map((tagId) => getTag(tagId, content))
</script>

<Link
    href={`/stories/${story.link}`}
    unstyled
    class="grid max-h-max max-w-2xl justify-self-center"
    tabindex={0}
>
    <div
        class="relative max-h-max transform-gpu rounded-2xl bg-stone-50 p-4 text-stone-900 duration-100 hover:scale-[103%]"
    >
        <div class="flex h-full max-h-max flex-col justify-between">
            <div>
                <Heading size={2}>{story.title}</Heading>
                <Tags {tags} visible={3} class="pt-2 pr-6" />
                <Markdown source={intro} class="pt-2 pb-4" variant="inverted" />
            </div>
            <!-- <RelevantDimensions {story} {content} visible={4} /> -->
        </div>

        <Arrow
            class="absolute bottom-5 right-5 mb-1 grid h-6 w-6 place-items-center"
        />
    </div>
</Link>
