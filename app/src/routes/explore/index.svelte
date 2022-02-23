<script lang="ts">
    import { onMount } from 'svelte'

    import type { Content } from '$lib/types'
    import { selectedSkills } from '$lib/stores'
    import LinkButton from '$components/LinkButton.svelte'
    import RecommendedTools from '$components/RecommendedTools.svelte'
    import ToolListItem from '$components/ToolListItem.svelte'
    import Heading from '$components/Heading.svelte'

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

    <h2 class="mt-12 pb-6 text-3xl font-bold">All tools</h2>
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

<div class="mt-16 grid items-center rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading>By the community, for the community</Heading>
    <p class="pb-4 text-center font-bold">
        Did you know that IDG.tools is created by people from all around the
        world? Meet others practicing inner devlopment, and supportive
        community.
    </p>
    <LinkButton href="/focus" class="mx-auto block" variant="inverted">
        Join community
    </LinkButton>
</div>
