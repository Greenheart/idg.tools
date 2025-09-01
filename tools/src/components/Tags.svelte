<script lang="ts">
    import { onKeydown } from '$lib/utils'
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
        lg: { tag: 'px-2 py-1', wrapper: 'text-sm xs:text-base gap-2 sm:gap-3' },
    }

    interface Props {
        size?: keyof typeof sizes
        inverted?: boolean
        interactive?: boolean
        tags: Tag[]
        visible?: number
        class?: string
    }

    let {
        size = 'sm',
        inverted = false,
        interactive = false,
        tags,
        visible = tags.length,
        class: className = '',
    }: Props = $props()

    const renderAs = interactive ? 'button' : 'span'
</script>

<div class={['flex select-none flex-wrap items-start', sizes[size].wrapper, className]}>
    {#each tags.slice(0, visible) as tag (tag.name)}
        <!-- svelte-ignore a11y_no_static_element_interactions (false positive since only the button element will be interactive) -->
        <svelte:element
            this={renderAs}
            onclick={interactive ? () => toggleTag(tag.id) : null}
            onkeydown={interactive ? onKeydown(() => toggleTag(tag.id)) : null}
            class={[
                interactive
                    ? $selectedTags.includes(tag.id)
                        ? 'cursor-pointer'
                        : 'cursor-pointer bg-opacity-50'
                    : '',
                sizes[size].tag,
                inverted ? 'bg-white text-black shadow-xl' : 'bg-black text-white',
            ]}
        >
            {tag.name}
        </svelte:element>
    {/each}
</div>
