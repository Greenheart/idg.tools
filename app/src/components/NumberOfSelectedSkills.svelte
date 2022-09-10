<script lang="ts">
    import type { Category } from '$shared/types'
    import { selectedSkills } from '$lib/stores'

    export let skillsInCategory: Category['skills']

    $: selectedInCategory = skillsInCategory.reduce(
        (count, skill) =>
            $selectedSkills.some((s) => s === skill) ? count + 1 : count,
        0,
    )
</script>

{#if selectedInCategory}
    <span class="px-2">&middot;</span>
    <span class="text-base font-normal">
        {selectedInCategory}/{skillsInCategory.length}</span
    >
{/if}
