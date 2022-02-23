<script lang="ts">
    import { onMount } from 'svelte'

    import type { Content } from '$lib/types'
    import { selectedSkills } from '$lib/stores'
    import LinkButton from '$components/LinkButton.svelte'
    import RecommendedTools from '$components/RecommendedTools.svelte'
    import ToolListItem from '$components/ToolListItem.svelte'
    import Heading from '$components/Heading.svelte'
    import { COMMUNITY_LINK } from '$lib/constants'

    export let content: Content

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })
</script>

<!-- TODO: list all tools in grid format -->
<!-- IDEA: filter tools based on related IDGs (possible to select one or multiple) -->
<!-- IDEA: add basic client side search to find relevant content -->
<!-- IDEA: at the bottom, add invitation to join the co-creation -->

{#if $selectedSkills.length}
    <div class="flex items-center justify-between py-4">
        <Heading>Recommended for you</Heading>
        <LinkButton href="/focus" size="sm">Preferences</LinkButton>
    </div>

    <!-- TODO: load a random tool based on the user's selected IDGs. Don't show all recommended, but select a new one every day -->

    <RecommendedTools selectedSkills={$selectedSkills} {content} />

    <Heading class="mt-12 pb-6">All tools</Heading>
{:else}
    <div class="items-center flex justify-between py-4">
        <Heading>All tools</Heading>
        <LinkButton href="/focus" size="sm">Preferences</LinkButton>
    </div>
{/if}

<div class="grid gap-2">
    {#each content.tools as tool (tool.slug)}
        <ToolListItem {tool} {content} />
    {/each}
</div>

<div
    class="mt-16 flex flex-col items-center justify-between rounded-2xl bg-stone-50 p-4 text-center text-stone-900"
>
    <!-- <Heading>By the community,<br />for the community</Heading> -->
    <Heading>Created by and for the community</Heading>

    <p class="pt-3 pb-4 text-lg">
        Did you know that IDG.tools is co-created by people from all around the
        world? Join a supportive community and practice inner development
        together.
    </p>

    <LinkButton href={COMMUNITY_LINK} variant="inverted">
        Join community
    </LinkButton>
</div>
