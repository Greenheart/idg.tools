<script lang="ts">
    import 'innerdevelopmentgoals/framework.css'
    import IDGFramework from 'innerdevelopmentgoals/framework'
    import { bodyClass } from '$shared/utils'
    import { onMount } from 'svelte'

    let container: HTMLDivElement

    onMount(() => {
        IDGFramework(container)
    })
</script>

<svelte:body use:bodyClass={'bg-white'} />

<div class="xs:px-2" bind:this={container}></div>
