<script lang="ts">
    import type { Category } from '$shared/runtime-types'
    import { selectedSkills } from '$lib/stores'

    export let skillsInCategory: Category['skills']

    $: selectedInCategory = skillsInCategory.reduce(
        (count, skill) =>
            $selectedSkills.some((s) => s === skill) ? count + 1 : count,
        0,
    )
</script>

{#if selectedInCategory}
    <span class="grid h-6 w-6 place-items-center rounded-full bg-white"
        >{selectedInCategory}</span
    >
{/if}
