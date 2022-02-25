<script lang="ts">
    import type { Tool, Content } from '$lib/types'
    import Heading from './Heading.svelte'
    import Link from './Link.svelte'
    import Markdown from './Markdown.svelte'
    import RelevantSkills from './RelevantSkills.svelte'

    export let tool: Tool
    export let content: Content
</script>

<Link href={`/explore/${tool.slug}`}>
    <div
        class="relative transform-gpu rounded-2xl bg-stone-50 p-4 text-stone-900 duration-100 hover:scale-[103%]"
    >
        <Heading size={3}>{tool.name}</Heading>
        <Markdown source={tool.description} class="py-2" variant="inverted" />

        <Heading size={3} class="pb-4">Skills you'll develop</Heading>

        <RelevantSkills {tool} {content} />

        <svg
            class="absolute bottom-4 right-4 h-6 w-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            ><path
                fill-rule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
            /></svg
        >
    </div>
</Link>
