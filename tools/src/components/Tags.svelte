<script lang="ts">
    import { cx, onKeydown } from '$lib/utils'
    import type { Tag } from '$shared/types'
    import { selectedTags } from '$lib/stores'

    const toggleTag = (tagId: Tag['id']) => {
        if ($selectedTags.includes(tagId)) {
            $selectedTags = $selectedTags.filter((id) => id !== tagId)
        } else {
            $selectedTags = [...$selectedTags, tagId]
        }
    }

    const sizes = {
        sm: { tag: 'p-1', wrapper: 'text-xs gap-1' },
        md: { tag: 'px-2 py-1', wrapper: 'text-sm gap-2' },
        lg: { tag: 'px-2 py-1', wrapper: 'text-sm xs:text-base gap-3' },
    }

    export let size: keyof typeof sizes = 'sm'
    export let inverted: boolean = false
    export let interactive = false
    export let tags: Tag[]
    export let visible: number = tags.length
    let className = ''
    export { className as class }

    const renderAs = interactive ? 'button' : 'span'
</script>

<div class={cx('flex select-none flex-wrap items-start', sizes[size].wrapper, className)}>
    {#each tags.slice(0, visible) as tag (tag.name)}
        <svelte:element
            this={renderAs}
            on:click={interactive ? () => toggleTag(tag.id) : () => {}}
            on:keydown={interactive ? onKeydown(() => toggleTag(tag.id)) : () => {}}
            class={cx(
                interactive
                    ? $selectedTags.includes(tag.id)
                        ? 'cursor-pointer'
                        : 'cursor-pointer bg-opacity-50'
                    : '',
                sizes[size].tag,
                inverted ? 'bg-stone-50 text-stone-900' : 'bg-stone-900 text-stone-50',
            )}
        >
            {tag.name}
        </svelte:element>
    {/each}
</div>
