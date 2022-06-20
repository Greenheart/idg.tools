<script lang="ts">
    import type { Tool, Content } from '$shared/types'
    import Heading from './Heading.svelte'
    import Arrow from './icons/Arrow.svelte'
    import Link from './Link.svelte'
    import Markdown from './Markdown.svelte'
    import RelevantSkills from './RelevantSkills.svelte'
    import Tags from './Tags.svelte'

    export let tool: Tool
    export let content: Content
</script>

<Link href={`/explore/${tool.link}`} unstyled>
    <div
        class="relative transform-gpu rounded-2xl bg-stone-50 p-4 text-stone-900 duration-100 hover:scale-[103%]"
    >
        <Heading size={2}>{tool.name}</Heading>

        <Tags {tool} {content} visible={3} class="pt-2" />

        <Markdown
            source={tool.description}
            class="pt-2 pb-4"
            variant="inverted"
        />

        <Heading size={4} class="pb-4">Skills you'll develop</Heading>

        <RelevantSkills {tool} {content} visible={4} />

        <Arrow class="absolute bottom-4 right-4 h-6 w-6" />
    </div>
</Link>
