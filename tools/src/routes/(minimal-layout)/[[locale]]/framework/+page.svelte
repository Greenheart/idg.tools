<script lang="ts">
    import 'innerdevelopmentgoals/framework.css'
    import IDGFramework from 'innerdevelopmentgoals/framework'
    import { bodyClass } from '$shared/utils'
    import { onMount } from 'svelte'
    import { page } from '$app/state'

    let container: HTMLDivElement

    type Locale = Parameters<typeof IDGFramework>[1]['defaultLocale']

    onMount(() => {
        IDGFramework(container, { defaultLocale: page.params.locale as Locale })
    })
</script>

<svelte:body use:bodyClass={'bg-white'} />

<div bind:this={container}></div>
