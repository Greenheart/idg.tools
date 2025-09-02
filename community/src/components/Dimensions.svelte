<script lang="ts">
    import { getColor, onKeydown } from '$lib/utils'
    import type { Dimension } from '$shared/types'
    import { globalState } from '$lib/global-state.svelte'

    const toggleDimension = (dimensionId: Dimension['id']) => {
        if (globalState.selectedDimensions.includes(dimensionId)) {
            globalState.selectedDimensions = globalState.selectedDimensions.filter(
                (id) => id !== dimensionId,
            )
        } else {
            globalState.selectedDimensions = [...globalState.selectedDimensions, dimensionId]
        }
    }

    const sizes = {
        sm: { element: 'p-1', wrapper: 'text-xs gap-1' },
        md: { element: 'px-2 py-1', wrapper: 'text-sm gap-2' },
        lg: { element: 'px-2 py-1', wrapper: 'text-sm xs:text-base gap-3' },
    }

    interface Props {
        size?: keyof typeof sizes
        interactive?: boolean
        dimensions: Dimension[]
        class?: string
    }

    let { size = 'sm', interactive = false, dimensions, class: className = '' }: Props = $props()

    const renderAs = interactive ? 'button' : 'span'
</script>

<div class={['flex select-none flex-wrap items-start text-black', sizes[size].wrapper, className]}>
    {#each dimensions as dimension (dimension.name)}
        {@const color = getColor(dimension.id)}
        <svelte:element
            this={renderAs}
            onclick={interactive ? () => toggleDimension(dimension.id) : () => {}}
            onkeydown={interactive ? onKeydown(() => toggleDimension(dimension.id)) : () => {}}
            class={[
                interactive
                    ? globalState.selectedDimensions.includes(dimension.id)
                        ? 'cursor-pointer'
                        : 'cursor-pointer bg-opacity-50'
                    : '',
                color,
                sizes[size].element,
            ]}
        >
            {dimension.name}
        </svelte:element>
    {/each}
</div>
