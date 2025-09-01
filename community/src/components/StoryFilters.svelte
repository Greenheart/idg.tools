<script lang="ts" module>
    import type { Dimension, Tag } from '$shared/types'
    import Dimensions from './Dimensions.svelte'
    import Tags from './Tags.svelte'
</script>

<script lang="ts">
    interface Props {
        dimensions: Dimension[]
        tags: Tag[]
    }

    let { dimensions, tags }: Props = $props()
</script>

<div class="mt-8 flex flex-wrap gap-4 gap-x-8 bg-white p-4 shadow-xl">
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
