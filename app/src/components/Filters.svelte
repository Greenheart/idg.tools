<script lang="ts">
    import { clickOutside } from '$lib/directives'
    import { selectedSkills, filtersExpanded } from '$lib/stores'
    import { pluralize } from '$lib/utils'
    import type { Content } from '$shared/types'
    import Button from './Button.svelte'
    import Expand from './icons/Expand.svelte'
    import Skills from './Skills.svelte'

    export let content: Content

    function resetFilters() {
        $selectedSkills = []
    }

    $: title = $selectedSkills.length
        ? `${pluralize('skill', $selectedSkills.length)} selected`
        : 'Select skills to practice'
</script>

<details
    bind:open={$filtersExpanded}
    class="sticky top-0 z-10 flex text-stone-900 shadow-2xl"
    use:clickOutside={() => ($filtersExpanded = false)}
>
    <summary
        class="flex h-14 cursor-pointer select-none items-center justify-between bg-stone-50 px-4 py-2"
    >
        <div class="flex items-center space-x-4">
            <Expand open={$filtersExpanded} />
            <p>{title}</p>
        </div>
        {#if $selectedSkills.length}
            <Button on:click={resetFilters} variant="inverted" size="md"
                >Reset</Button
            >
        {/if}
    </summary>
    <div
        class={'flex flex-wrap justify-center gap-3 p-4 border-t border-stone-900 text-stone-900 bg-stone-900'}
    >
        <Skills {content} />
    </div>
</details>
