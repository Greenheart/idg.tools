<script lang="ts">
    import { onMount } from 'svelte'

    import type { Content } from '$lib/types'
    import { selectedSkills } from '$lib/stores'
    import LinkButton from '$components/LinkButton.svelte'
    import RecommendedTools from '$components/RecommendedTools.svelte'
    import Tool from '$components/Tool.svelte'
    import Heading from '$components/Heading.svelte'
    import { COMMUNITY_LINK } from '$lib/constants'
    import Link from '$components/Link.svelte'

    export let content: Content

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })
</script>

<!-- TODO: list all tools in grid format -->
<!-- IDEA: filter tools based on related IDGs (possible to select one or multiple) -->
<!-- IDEA: add basic client side search to find relevant content -->
<!-- IDEA: at the bottom, add invitation to join the co-creation -->

<Heading size={1}>My tools</Heading>

<p class="py-5">
    These are the tools we recommend based on which skills you want to practice. <Link
        href="/skills"
        class="underline"
        style={'color: #E0A1B4;'}
    >
        Change skills here
    </Link>
</p>

<Heading class="pb-5">Library</Heading>

<div class="grid gap-5">
    {#if $selectedSkills.length}
        <!-- TODO: load a random tool based on the user's selected IDGs. Don't show all recommended, but select a new one every day -->
        <!-- TODO: improve recommended tools -->
        <RecommendedTools selectedSkills={$selectedSkills} {content} />
    {:else}
        {#each content.tools as tool (tool.slug)}
            <Tool {tool} {content} />
        {/each}
    {/if}
</div>

<div
    class="mt-16 flex flex-col items-center justify-between rounded-2xl bg-stone-50 p-4 text-center text-stone-900"
>
    <Heading>Created by and for the community</Heading>

    <p class="pt-3 pb-4">
        IDG.tools is co-created by people from all around the world - join our
        supportive community and let's practice inner development together!
    </p>

    <LinkButton href={COMMUNITY_LINK} variant="inverted">
        Join community
    </LinkButton>
</div>
