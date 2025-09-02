<script lang="ts">
    import { onKeydown } from '$lib/utils'
    import type { Tag } from '$shared/types'
    import { globalState } from '$lib/global-state.svelte'

    const toggleTag = (tagId: Tag['id']) => {
        if (globalState.selectedTags.includes(tagId)) {
            globalState.selectedTags = globalState.selectedTags.filter((id) => id !== tagId)
        } else {
            globalState.selectedTags = [...globalState.selectedTags, tagId]
        }
    }

    const sizes = {
        sm: { tag: 'p-1', wrapper: 'text-xs gap-1' },
        md: { tag: 'px-2 py-1', wrapper: 'text-sm gap-2' },
        lg: { tag: 'px-2 py-1', wrapper: 'text-sm xs:text-base gap-3' },
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

<!-- IDEA: Potentially split this component into a rendering component with various variants, and one separate for the logic -->

<div class={['flex select-none flex-wrap items-start', sizes[size].wrapper, className]}>
    {#each tags.slice(0, visible) as tag (tag.name)}
        <!-- svelte-ignore a11y_no_static_element_interactions (false positive since only the button element will be interactive) -->
        <svelte:element
            this={renderAs}
            onclick={interactive ? () => toggleTag(tag.id) : null}
            onkeydown={interactive ? onKeydown(() => toggleTag(tag.id)) : null}
            class={[
                sizes[size].tag,
                inverted ? 'bg-white text-black' : 'bg-black text-white',
                interactive
                    ? globalState.selectedTags.includes(tag.id)
                        ? 'cursor-pointer bg-white shadow-xl'
                        : 'cursor-pointer bg-stone-100 shadow-md'
                    : '',
            ]}
        >
            {tag.name}
        </svelte:element>
    {/each}
</div>
