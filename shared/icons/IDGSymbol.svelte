<script lang="ts">
    import type { Skill, Dimension, IDGSymbols } from '../types'

    interface Props {
        class?: string
        style?: string
        id: Skill['id'] | Dimension['id']
        symbols: IDGSymbols
    }

    let { class: className = '', style = '', id, symbols }: Props = $props()
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    stroke="currentColor"
    viewBox="0 0 198.43 198.43"
    class={className}
    {style}
>
    {#each symbols[id] as path}
        <path d={path} />
    {/each}
</svg>
