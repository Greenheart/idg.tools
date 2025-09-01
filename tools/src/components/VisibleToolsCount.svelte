<script lang="ts">
    import type { Tool } from '$shared/types'
    import { visibleItems } from '$lib/stores'

    interface Props {
        mostRelevantTools: Tool[]
        allToolsCount: number
    }

    let { mostRelevantTools, allToolsCount }: Props = $props()
</script>

Showing {Math.min($visibleItems, mostRelevantTools.length)} of {allToolsCount} tools
