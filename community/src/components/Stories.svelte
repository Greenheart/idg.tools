<script lang="ts">
    import type { CommunityContent, Story } from '$shared/types'
    import StoryPreview from './StoryPreview.svelte'
    import Button from '$shared/components/Button.svelte'

    export let stories: Story[]
    export let content: CommunityContent

    let visibleItems = 10

    const showMore = () => {
        visibleItems += 10
    }
</script>

{#each stories.slice(0, visibleItems) as story (story.link)}
    <StoryPreview {story} {content} />
{/each}

<div
    class="flex flex-col items-center justify-center space-y-4 pt-8 lg:col-span-2"
>
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
