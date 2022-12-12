<script lang="ts">
    import Button from '$shared/components/Button.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import Divider from '$shared/components/Divider.svelte'
    import StoryPreview from './StoryPreview.svelte'
    import Tags from './Tags.svelte'
    import { getMostRelevantStories } from '$shared/content-utils'
    import { selectedTags, selectedDimensions } from '$lib/stores'
    import type { CommunityContent } from '$shared/types'
    import { STORIES_ABOUT_LINK } from '$lib/constants'
    // import Dimensions from './Dimensions.svelte'
    // import StoryFilters from './StoryFilters.svelte'

    export let content: CommunityContent

    let visibleItems = 10

    $: stories = (
        $selectedTags.length || $selectedDimensions.length
            ? getMostRelevantStories(content, $selectedTags, $selectedDimensions)
            : content.stories
    ).slice(0, visibleItems)

    const showMore = () => {
        visibleItems += 10
    }

    const resetFilters = () => {
        $selectedTags = []
        $selectedDimensions = []
    }
</script>

<div class="pt-16">
    <Heading class="pt-16" id="stories" size={1} tag="h2">Featured stories</Heading>

    <p class="pt-4 pb-2">Select tags to filter:</p>
    <Tags tags={content.tags} size="md" interactive inverted class="pb-4" />

    <!-- <StoryFilters tags={content.tags} dimensions={content.dimensions} /> -->

    <!-- <p class="my-2 text-sm">
        {#if $selectedTags.length || $selectedDimensions.length}Showing {stories.length}/{content
                .stories.length} stories.{/if}
        Select tags to filter:
    </p>

    <div class="relative mb-4 bg-white p-4 text-base text-black">
        <div class="flex flex-wrap items-center justify-between">
            <p class="font-bold">Select filters</p>
            <Button on:click={resetFilters} size="md" class="text-xs" variant="inverted"
                >Clear filters</Button
            >
        </div>

        <p>Tags:</p>
        <Tags tags={content.tags} size="md" interactive />
        <p>Dimensions:</p>
        <Dimensions dimensions={content.dimensions} size="md" interactive />
    </div> -->

    <div
        class="mx-auto grid max-w-lg items-start justify-items-center gap-8 md:w-full md:max-w-none md:grid-cols-2 lg:gap-x-12"
    >
        {#each stories as story (story.id)}
            <StoryPreview {story} {content} />
        {/each}
    </div>

    <Divider class="my-16" />

    <div class="flex flex-col items-center justify-center space-y-4 lg:col-span-2">
        <p>
            Showing {stories.length} of {content.stories.length} stories
        </p>

        {#if visibleItems < content.stories.length}
            <Button on:click={showMore}>Show more</Button>
        {:else}
            <p>
                Welcome to <Link href={STORIES_ABOUT_LINK} variant="pink">share your story</Link>!
            </p>
        {/if}
    </div>

    <!--
        IDEA: UI for filters could be to select the tags you want to find
        This would make stories re-order based on the nice transition in the svelte todo list example

        Selecting multiple tags should be possible to filter for the comibinations.default

        Add a clear button to remove

        Refactor the display of stories and filters into a <Stories /> component to keep the landing page clean.
    -->
    <!-- IDEA: Make it possible to explore stories based on dimensions and contributors -->
</div>

<div class="hidden">
    {#each stories as story (story.link)}
        <StoryPreview {story} {content} />
    {/each}
</div>
