<script lang="ts">
    import type { Tool } from '$shared/runtime-types'
    import { cx } from '$lib/utils'

    export let inverted: boolean = false

    export let tool: Tool
    export let visible: number
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-1 pr-6', className)}>
    {#each tool.tags.slice(0, visible) as tag}
        <span
            class={cx(
                'rounded-lg p-1 text-xs',
                inverted
                    ? 'bg-white text-stone-900'
                    : 'bg-stone-900 text-white',
            )}
        >
            {tag.name}
        </span>
    {/each}
</div>
