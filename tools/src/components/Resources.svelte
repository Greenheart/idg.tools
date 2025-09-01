<script lang="ts">
    import type { Tool } from '$shared/types'
    import { Markdown } from '$shared/components'

    interface Props {
        tool: Tool
        class?: string
    }

    let { tool, class: className = '' }: Props = $props()

    let visibleResources = $state(5)
    const allResources = tool.resources.split('\n').filter(Boolean)
    let source = $derived(allResources.slice(0, visibleResources).join('\n'))

    const showAll = () => {
        visibleResources = allResources.length
        source = tool.resources
    }
</script>

<div class={className}>
    <Markdown {source} formatting="limited" class="!prose-base max-w-none" />
    {#if visibleResources < allResources.length}
        <button class="text-collaborating mt-4 font-semibold underline" onclick={showAll}>
            Show {allResources.length - visibleResources} more
        </button>
    {/if}
</div>
