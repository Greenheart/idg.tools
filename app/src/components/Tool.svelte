<script lang="ts">
    import type { Tool, Content } from '$lib/types'
    import Heading from './Heading.svelte'
    import Arrow from './icons/Arrow.svelte'
    import Link from './Link.svelte'
    import Markdown from './Markdown.svelte'
    import RelevantSkills from './RelevantSkills.svelte'

    export let tool: Tool
    export let content: Content
</script>

<Link href={`/explore/${tool.link}`} unstyled>
    <div
        class="relative transform-gpu rounded-2xl bg-stone-50 p-4 text-stone-900 duration-100 hover:scale-[103%]"
    >
        <Heading size={3}>{tool.name}</Heading>
        <Markdown source={tool.description} class="py-2" variant="inverted" />

        <Heading size={3} class="pb-4">Skills you'll develop</Heading>

        <RelevantSkills {tool} {content} />

        <Arrow class="absolute bottom-4 right-4 h-6 w-6" />
    </div>
</Link>
