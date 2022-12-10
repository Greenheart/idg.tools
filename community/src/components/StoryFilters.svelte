<script lang="ts" context="module">
    import type { Dimension, Tag } from '$shared/types'
    import Dimensions from './Dimensions.svelte'
    import Tags from './Tags.svelte'
</script>

<script lang="ts">
    export let dimensions: Dimension[]
    export let tags: Tag[]
</script>

<div class="mt-8 flex flex-wrap gap-4 gap-x-8 bg-stone-50 p-4 text-stone-900 shadow-2xl">
    {#if dimensions?.length}
        <div class="flex flex-wrap items-center">
            <p class="mb-2 text-sm uppercase">Dimensions</p>
            <Dimensions {dimensions} interactive size="md" />
        </div>
    {/if}

    {#if tags?.length}
        <div class="flex flex-wrap items-center">
            <p class="mb-2 text-sm uppercase">Tags</p>
            <Tags {tags} interactive size="md" class="!gap-1" />
        </div>
    {/if}
</div>
