<script lang="ts">
    import type { Dimension } from '$shared/types'
    import { persistedState } from '$lib/persisted-state.svelte'

    interface Props {
        skillsInDimension: Dimension['skills']
    }

    let { skillsInDimension }: Props = $props()

    let selectedInDimension = $derived(
        skillsInDimension.reduce(
            (count, skill) =>
                persistedState.selectedSkills.current.some((s) => s === skill) ? count + 1 : count,
            0,
        ),
    )
</script>

{#if selectedInDimension}
    <span class="px-1 md:px-2">&middot;</span>
    <span class="text-xs font-normal sm:text-sm md:text-base">
        {selectedInDimension}/{skillsInDimension.length}</span
    >
{/if}
