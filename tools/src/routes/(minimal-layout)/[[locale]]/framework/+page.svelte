<script lang="ts">
    import 'innerdevelopmentgoals/framework.css'
    import IDGFramework from 'innerdevelopmentgoals/framework'
    import { bodyClass } from '$shared/utils'
    import { onMount } from 'svelte'
    import { page } from '$app/state'

    let container: HTMLDivElement

    onMount(() => {
        IDGFramework.show(container, { defaultLocale: page.params.locale })
    })
</script>

<svelte:body use:bodyClass={'bg-white'} />

<div class="xs:px-2" bind:this={container}></div>
