<script lang="ts">
    import { cx, getColor, onKeydown } from '$lib/utils'
    import type { Dimension } from '$shared/types'
    import { selectedDimensions } from '$lib/stores'

    const toggleDimension = (dimensionId: Dimension['id']) => {
        if ($selectedDimensions.includes(dimensionId)) {
            $selectedDimensions = $selectedDimensions.filter((id) => id !== dimensionId)
        } else {
            $selectedDimensions = [...$selectedDimensions, dimensionId]
        }
    }

    const sizes = {
        sm: { element: 'p-1', wrapper: 'text-xs gap-1' },
        md: { element: 'px-2 py-1', wrapper: 'text-sm gap-2' },
        lg: { element: 'px-2 py-1', wrapper: 'text-sm xs:text-base gap-3' },
    }

    export let size: keyof typeof sizes = 'sm'
    export let interactive = false
    export let dimensions: Dimension[]
    let className = ''
    export { className as class }

    const renderAs = interactive ? 'button' : 'span'
</script>

<div
    class={cx(
        'flex select-none flex-wrap items-start text-stone-50',
        sizes[size].wrapper,
        className,
    )}
>
    {#each dimensions as dimension (dimension.name)}
        {@const color = getColor(dimension.id)}
        <svelte:element
            this={renderAs}
            on:click={interactive ? () => toggleDimension(dimension.id) : () => {}}
            on:keydown={interactive ? onKeydown(() => toggleDimension(dimension.id)) : () => {}}
            class={cx(
                interactive
                    ? $selectedDimensions.includes(dimension.id)
                        ? 'cursor-pointer'
                        : 'cursor-pointer bg-opacity-50'
                    : '',
                color,
                sizes[size].element,
            )}
        >
            {dimension.name}
        </svelte:element>
    {/each}
</div>
