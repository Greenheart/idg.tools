<script lang="ts">
    import type { Tool } from '$shared/types'
    import { visibleItems, selectedSkills, selectedTags } from '$lib/stores'

    export let mostRelevantTools: Tool[]
    export let allToolsCount: number
</script>

Showing {Math.min($visibleItems, mostRelevantTools.length)} of {allToolsCount} tools{#if $selectedSkills.length || $selectedTags.length}&nbsp;matching
    your search{/if}
