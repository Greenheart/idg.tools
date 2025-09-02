<script lang="ts">
    import { flip } from 'svelte/animate'
    import { crossfade, fade } from 'svelte/transition'
    import { quintOut } from 'svelte/easing'

    import type { ToolsContent, Tool } from '$shared/types'
    import { selectedSkills, visibleItems, selectedTags } from '$lib/stores'
    import ToolPreview from './ToolPreview.svelte'
    import { Button } from '$shared/components'
    import VisibleToolsCount from './VisibleToolsCount.svelte'

    interface Props {
        mostRelevantTools: Tool[]
        content: ToolsContent
    }

    let { mostRelevantTools, content }: Props = $props()
    // TODO: Implement option to reduce motion
    // export let reduceMotion: boolean

    const showAll = () => {
        $selectedSkills = []
        $selectedTags = []
    }

    const showMore = () => {
        $visibleItems = Math.max(
            mostRelevantTools.length,
            Math.min($visibleItems + 10, mostRelevantTools.length),
        )
    }

    const [send, receive] = crossfade({
        duration: 500,
        easing: quintOut,
        fallback: (node) => {
            return fade(node, { duration: 300 })
        },
    })
</script>

<div class="grid gap-8 lg:grid-cols-2">
    {#each mostRelevantTools.slice(0, $visibleItems) as tool (tool.link)}
        {@const key = tool.id}
        <div
            animate:flip={{ duration: 400 }}
            in:send={{ key }}
            out:receive={{ key }}
            class="grid max-h-max max-w-2xl justify-self-center"
        >
            <ToolPreview {tool} {content} />
        </div>
    {:else}
        <!--
            TODO: hide previous tools quicker when showing the empty message,
            IDEA: or add a delay before showing it so the other content can fade out first
        -->
        <div
            class="flex flex-col items-center space-y-4 lg:col-span-2 text-sm"
            in:fade={{ duration: 250 }}
        >
            <p>There are no published tools matching your search yet</p>
            <Button onclick={showAll}>Show all tools</Button>
        </div>
    {/each}

    <div
        class="flex flex-col items-center justify-center gap-4 space-y-4 pt-8 text-sm lg:col-span-2"
    >
        <VisibleToolsCount {mostRelevantTools} allToolsCount={content.tools.length} />
        {#if $visibleItems < mostRelevantTools.length}
            <Button onclick={showMore}>Show more</Button>
        {:else if mostRelevantTools.length && ($selectedSkills.length || $selectedTags.length)}
            <Button onclick={showAll}>Show all tools</Button>
        {/if}
    </div>
</div>
