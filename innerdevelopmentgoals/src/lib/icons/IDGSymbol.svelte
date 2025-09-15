<script lang="ts">
    import type { ClassValue } from 'svelte/elements'
    import type { IDGSymbols } from '$shared/types'

    interface Props {
        class?: ClassValue
        style?: string
        'aria-label': string
        symbolPaths: IDGSymbols[keyof IDGSymbols]
    }

    let { symbolPaths, ...props }: Props = $props()
</script>

<!-- TODO: Ideally, we shouldn't need the class or style props for the icons. Use context-aware styles instead -->

<svg
    {...props}
    class={['idg-symbol', props.class]}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 198.43 198.43"
>
    {#each symbolPaths as path}
        <path d={path} />
    {/each}
</svg>
