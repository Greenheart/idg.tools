<script lang="ts">
    import Heading from '$components/Heading.svelte'
    import Markdown from '$components/Markdown.svelte'
    import { cx, getColor } from '$lib/utils'
    import { getDateTimeString } from '$shared/content-utils'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ event, dimensions } = data)
</script>

<Heading size={1} class="mb-4">{event.name}</Heading>

<div class="grid grid-cols-[min-content_1fr] gap-x-4">
    <span>Starts:</span>
    <span>{getDateTimeString(event.startDate)}</span>
    <span>Ends:</span>
    <span>{getDateTimeString(event.endDate)}</span>
    <span class="flex">Location:</span>
    <Markdown source={event.location} />
</div>

<div class="flex items-center mt-4">
    <div class="flex space-x-2">
        {#each dimensions as dimension}
            {@const color = getColor(dimension.id)}
            <span class={cx('px-2 py-1 text-sm text-white rounded-lg', color)}
                >{dimension.name}</span
            >
        {/each}
    </div>
</div>

<Markdown source={event.description} class="pt-4 text-lg" />

<!-- 
<div class="mt-8 rounded-2xl bg-stone-50 p-4 text-stone-900">
    <Heading class="pb-2 text-2xl">How to practice</Heading>
    <Markdown source={tool.actions} variant="inverted" />
</div> -->
