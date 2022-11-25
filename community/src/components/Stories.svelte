<script lang="ts">
    import { selectedTags } from '$lib/stores'
    import type { CommunityContent } from '$shared/types'
    import StoryPreview from './StoryPreview.svelte'
    import Button from '$shared/components/Button.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Tags from './Tags.svelte'
    import { getMostRelevantStories } from '$shared/content-utils'

    export let content: CommunityContent

    let visibleItems = 10

    $: stories = (
        $selectedTags.length ? getMostRelevantStories(content, $selectedTags) : content.stories
    ).slice(0, visibleItems)

    const showMore = () => {
        visibleItems += 2
    }
</script>

<!-- IDEA: If filters are applied, the featured stories will be hidden and only the relevant stories are shown, sorted by most relevant first -->

<div class="pt-16">
    <Heading class="pt-16" id="stories" size={1} tag="h2"
        >{#if $selectedTags.length}Most relevant{:else}Featured{/if} stories</Heading
    >

    <p class="my-2 text-sm">
        {#if $selectedTags.length}Showing {stories.length}/{content.stories.length} stories.{/if}
        Select tags to filter:
    </p>

    <div class="mb-4">
        <Tags tags={content.tags} size="md" interactive inverted />
    </div>

    <div
        class="mx-auto grid max-w-lg items-start justify-items-center gap-8 md:w-full md:max-w-none md:grid-cols-2 lg:gap-x-12"
    >
        {#each stories as story (story.id)}
            <StoryPreview {story} {content} />
        {/each}
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
    {#each stories.slice(0, visibleItems) as story (story.link)}
        <StoryPreview {story} {content} />
    {/each}

    <div class="flex flex-col items-center justify-center space-y-4 pt-8 lg:col-span-2">
        {#if visibleItems < stories.length}
            <Button on:click={showMore}>Show more</Button>
        {:else if stories.length}
            <p>These are all published stories so far.</p>
            <!-- TODO: Add a way to submit a new story -->
            <!-- <p>
            Welcome to <Link href={SUGGEST_NEW_TOOL_LINK} variant="pink"
                >suggest a new story here</Link
            >!
        </p> -->
        {/if}
    </div>
</div>
