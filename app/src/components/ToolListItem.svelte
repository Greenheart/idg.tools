<script lang="ts">
    import { getCategory, getSkill, Tool } from '$lib/idgs'
    import Button from './Button.svelte'
    import Link from './Link.svelte'

    export let tool: Tool
</script>

<Link href={`/explore/${tool.slug}`}>
    <div class="bg-stone-900 p-4">
        <h2 class="pb-4 font-semibold">{tool.name}</h2>
        <div class="flex space-x-2">
            {#each tool.skills as skillId}
                {@const skill = getSkill(skillId)}
                {@const category = getCategory(skill.category)}
                <Button
                    size="sm"
                    style={`background-color: ${category.color}`}
                    label={skill.name}
                />
            {/each}
        </div>
    </div>
</Link>
