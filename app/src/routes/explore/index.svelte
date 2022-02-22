<script lang="ts">
    import { onMount } from 'svelte'

    import type { Content } from '$lib/types'
    import { selectedSkills } from '$lib/stores'
    import LinkButton from '$components/LinkButton.svelte'
    import RecommendedTools from '$components/RecommendedTools.svelte'
    import ToolListItem from '$components/ToolListItem.svelte'

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
        <h2 class="font-bold">Recommended for you</h2>
        <LinkButton href="/focus" size="sm">Preferences</LinkButton>
    </div>

    <!-- TODO: load a random tool based on the user's selected IDGs. Don't show all recommended, but select a new one every day -->

    <RecommendedTools selectedSkills={$selectedSkills} {content} />

    <h2 class="mt-12 pb-6 text-3xl font-bold">All tools</h2>
{:else}
    <div class="items-center flex justify-between py-4">
        <h2 class="font-bold">All tools</h2>
        <LinkButton href="/focus" size="sm">Preferences</LinkButton>
    </div>
{/if}

<div class="grid gap-2">
    {#each content.tools as tool (tool.slug)}
        <ToolListItem {tool} {content} />
    {/each}
</div>
