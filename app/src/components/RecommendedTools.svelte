<script lang="ts">
    import { TOOLS } from '$lib/tools'
    import { getColorForSkill, getSkill } from '$lib/idgs'
    import Button from '$components/Button.svelte'
    import Link from '$components/Link.svelte'

    export let selectedSkills: number[]
</script>

{#each Object.entries(TOOLS) as [slug, tool] (slug)}
    {#each tool.skills as skillId}
        {#if selectedSkills.includes(skillId)}
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
        {/if}
    {/each}
{/each}
