<script lang="ts">
    import { cx } from '$lib/utils'
    import type { Tag } from '$shared/types'
    import { selectedTags } from '$lib/stores'

    export let inverted: boolean = false
    export let interactive = false

    const sizes = {
        sm: 'p-1 text-xs',
        md: 'px-2 py-1 text-sm xs:text-base',
    }

    export let size: keyof typeof sizes = 'sm'

    const toggleTag = (tagId: Tag['id']) => {
        if ($selectedTags.includes(tagId)) {
            $selectedTags = $selectedTags.filter((id) => id !== tagId)
        } else {
            $selectedTags = [...$selectedTags, tagId]
        }
    }

    export let tags: Tag[]
    export let visible: number = tags.length
    let className = ''
    export { className as class }
</script>

<div class={cx('flex flex-wrap items-start gap-1 pr-6 select-none', className)}>
    {#each tags.slice(0, visible) as tag (tag.name)}
        <span
            on:click={interactive ? () => toggleTag(tag.id) : () => {}}
            on:keypress={interactive ? () => toggleTag(tag.id) : () => {}}
            class={cx(
                'rounded-lg',
                interactive
                    ? $selectedTags.includes(tag.id)
                        ? 'cursor-pointer'
                        : 'bg-opacity-50 cursor-pointer'
                    : '',
                sizes[size],
                inverted
                    ? 'bg-stone-50 text-stone-900'
                    : 'bg-stone-900 text-stone-50',
            )}
        >
            {tag.name}
        </span>
    {/each}
</div>
