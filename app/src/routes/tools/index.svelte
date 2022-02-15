<script lang="ts">
    import { TOOLS } from '$lib/tools'
    import { getColorForSkill, getSkill } from '$lib/idgs'
    import Button from '$components/Button.svelte'
    import Link from '$components/Link.svelte'
</script>

<!-- TODO: list all tools in grid format -->
<!-- IDEA: filter tools based on related IDGs (possible to select one or multiple) -->
<!-- IDEA: show your recommended tools, based on your interests at the top, but list all below -->
<!-- IDEA: add basic client side search to find relevant content -->
<!-- IDEA: at the bottom, add invitation to join the co-creation -->

{#each Object.entries(TOOLS) as [slug, tool] (slug)}
    {#each tool.skills as skillId}
        <Link href={`/tools/${slug}`}>
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
