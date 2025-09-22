<script lang="ts">
    import 'innerdevelopmentgoals/framework.css'
    import * as IDGFramework from 'innerdevelopmentgoals/framework'
    import { bodyClass } from '$shared/utils'
    import { onMount } from 'svelte'
    import { page } from '$app/state'

    let container: HTMLDivElement

    type Locale = Parameters<typeof IDGFramework.show>[1]['defaultLocale']

    onMount(() => {
        IDGFramework.show(container, { defaultLocale: page.params.locale as Locale })
    })
</script>

<svelte:body use:bodyClass={'bg-white'} />

<div class="xs:px-2" bind:this={container}></div>
