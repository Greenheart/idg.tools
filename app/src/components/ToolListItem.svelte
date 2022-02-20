<script lang="ts">
    import { getCategory, getSkill } from '$lib/content-utils'

    import type { Tool, Content } from '$lib/types'
    import Button from './Button.svelte'
    import Link from './Link.svelte'

    export let tool: Tool
    export let content: Content
</script>

<Link href={`/explore/${tool.slug}`}>
    <div class="bg-stone-900 p-4">
        <h2 class="pb-4 font-semibold">{tool.name}</h2>
        <div class="flex space-x-2">
            {#each tool.skills as skillId}
                {@const skill = getSkill(skillId, content)}
                {@const category = getCategory(skill.category, content)}
                <!-- TODO: replace buttons since these categories don't need to be interactive, neither clickable nor with any hover effect. -->
                <Button
                    size="sm"
                    style={`background-color: ${category.color}`}
                    label={skill.name}
                />
            {/each}
        </div>
    </div>
</Link>
