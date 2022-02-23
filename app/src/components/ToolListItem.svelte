<script lang="ts">
    import type { Tool, Content } from '$lib/types'
    import Heading from './Heading.svelte'
    import Link from './Link.svelte'
    import Skills from './Skills.svelte'

    export let tool: Tool
    export let content: Content
</script>

<Link href={`/explore/${tool.slug}`}>
    <div class="bg-stone-900 p-4">
        <Heading size={3} class="pb-4">{tool.name}</Heading>
        <Skills {tool} {content} />
    </div>
</Link>
