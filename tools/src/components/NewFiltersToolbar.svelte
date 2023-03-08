<script lang="ts">
    import FuzzySearch from '$shared/components/FuzzySearch.svelte'
    import { goto } from '$app/navigation'
    import type { Tool, ToolsContent } from '$shared/types'
    import { selectedSkills, selectedTags } from '$lib/stores'
    import Button from '$shared/components/Button.svelte'

    const resetFilters = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    // TODO: Add support for searching tool description, actions, resources, and more
    // But always show the name of the tool, or the excerpt of the relevant text
    const extract = (tool: Tool) => tool.name

    export let content: ToolsContent
</script>

<div class="toolbar grid grid-cols-2">
    <FuzzySearch data={content.tools} {extract} {goto} />

    <div class="flex items-center">
        <Button size="sm" on:click={resetFilters}>Reset Filters</Button>
    </div>
</div>

<!-- TODO: Make filters responsive -->

<!-- IDEA: Add advanced filters below the standard filters as a separate section. Allow them to be toggled on or off -->
<style>
    .toolbar {
        border-bottom: 0.25rem solid;
        border-image-slice: 1;
        border-image-source: linear-gradient(
            to right,
            var(--being) 0%,
            var(--being) 20%,
            var(--thinking) 20%,
            var(--thinking) 40%,
            var(--relating) 40%,
            var(--relating) 60%,
            var(--collaborating) 60%,
            var(--collaborating) 80%,
            var(--acting) 80%,
            var(--acting) 100%
        );
    }
</style>
