<script lang="ts">
    import type { Dimension } from '$shared/types'
    import { selectedSkills } from '$lib/stores'

    export let skillsInDimension: Dimension['skills']

    $: selectedInDimension = skillsInDimension.reduce(
        (count, skill) =>
            $selectedSkills.some((s) => s === skill) ? count + 1 : count,
        0,
    )
</script>

{#if selectedInDimension}
    <span class="px-2">&middot;</span>
    <span class="text-base font-normal">
        {selectedInDimension}/{skillsInDimension.length}</span
    >
{/if}
