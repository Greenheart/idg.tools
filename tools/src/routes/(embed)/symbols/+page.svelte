<script lang="ts">
    import type { PageData } from './$types'
    import Meta from '$components/Meta.svelte'
    import RandomSymbol from '$components/RandomSymbol.svelte'

    export let data: PageData
    $: ({ skills, symbols } = data)
</script>

<Meta title="IDG Symbols" description="Show a random IDG symbol" />

<RandomSymbol {skills} {symbols} />
