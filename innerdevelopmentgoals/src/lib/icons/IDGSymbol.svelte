<script lang="ts">
    import type { IDGSymbols } from '$shared/types'

    interface Props {
        'aria-label': string
        symbolPaths: IDGSymbols[keyof IDGSymbols]
    }

    let { symbolPaths, ...props }: Props = $props()
</script>

<svg {...props} class="idg-symbol" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 198.43 198.43">
    {#each symbolPaths as path}
        <path d={path} />
    {/each}
</svg>
