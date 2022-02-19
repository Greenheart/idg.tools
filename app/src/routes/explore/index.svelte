<script lang="ts">
    import { onMount } from 'svelte'

    import { TOOLS } from '$lib/tools'
    import { getColorForSkill, getSkill } from '$lib/idgs'
    import Button from '$components/Button.svelte'
    import Link from '$components/Link.svelte'
    import LinkButton from '$components/LinkButton.svelte'
    import RecommendedTools from '$components/RecommendedTools.svelte'
    import { selectedSkills } from '$lib/stores'

    onMount(() => {
        selectedSkills.useLocalStorage()
    })
</script>

<!-- TODO: list all tools in grid format -->
<!-- IDEA: filter tools based on related IDGs (possible to select one or multiple) -->
<!-- IDEA: add basic client side search to find relevant content -->
<!-- IDEA: at the bottom, add invitation to join the co-creation -->

{#if $selectedSkills.length}
    <div class="align-center flex justify-between py-4">
        <h2 class="font-bold">Recommended for you</h2>
        <LinkButton href="/focus" size="sm">Preferences</LinkButton>
    </div>

    <RecommendedTools selectedSkills={$selectedSkills} />

    <hr class="my-12" />

    <h2 class="font-bold">All tools</h2>
{:else}
    <div class="align-center flex justify-between py-4">
        <h2 class="font-bold">All tools</h2>
        <LinkButton href="/focus" size="sm">Preferences</LinkButton>
    </div>
{/if}

{#each Object.entries(TOOLS) as [slug, tool] (slug)}
    {#each tool.skills as skillId}
        <Link href={`/explore/${slug}`}>
            <div class="bg-black p-4">
                <h2 class="pb-4 font-semibold">{tool.name}</h2>
                <Button
                    size="sm"
                    class={getColorForSkill(skillId)}
                    label={getSkill(skillId).name}
                />
            </div>
        </Link>
    {/each}
{/each}
