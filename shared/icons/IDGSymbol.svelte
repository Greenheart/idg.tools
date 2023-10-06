<script lang="ts">
    import type { Skill, Dimension, IDGSymbols } from '../types'

    // TODO: Only allow dimension symbols until the launch - getDimensionForSkill()

    let className = ''
    export { className as class }
    export let style = ''

    export let id: Skill['id'] | Dimension['id']
    export let symbols: IDGSymbols
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
