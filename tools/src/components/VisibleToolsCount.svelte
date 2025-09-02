<script lang="ts">
    import type { Tool } from '$shared/types'
    import { globalState } from '$lib/global-state.svelte'

    interface Props {
        mostRelevantTools: Tool[]
        allToolsCount: number
    }

    let { mostRelevantTools, allToolsCount }: Props = $props()
</script>

Showing {Math.min(globalState.visibleItems, mostRelevantTools.length)} of {allToolsCount} tools
