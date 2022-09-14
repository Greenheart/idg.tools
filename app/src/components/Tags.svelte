<script lang="ts">
    import { getTag } from '$shared/content-utils'
    import type { Content, Tool } from '$shared/types'
    import { cx } from '$lib/utils'

    export let inverted: boolean = false

    export let tool: Tool
    export let visible: number
    export let content: Content
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-1 pr-6', className)}>
    {#each tool.tags.slice(0, visible) as tagId}
        {@const tag = getTag(tagId, content)}
        <span
            class={cx(
                'rounded-lg p-1 text-xs',
                inverted
                    ? 'bg-stone-50 text-stone-900'
                    : 'bg-stone-900 text-stone-50',
            )}
        >
            {tag.name}
        </span>
    {/each}
</div>
