<script lang="ts">
    import { cx } from '$lib/utils'
    import type { Tag } from '$shared/types'

    export let inverted: boolean = false

    export let tags: Tag[]
    export let visible: number
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-1 pr-6', className)}>
    {#each tags.slice(0, visible) as tag}
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
