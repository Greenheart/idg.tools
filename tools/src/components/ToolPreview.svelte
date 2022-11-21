<script lang="ts">
    import { truncateText } from '$lib/utils'
    import { getTag } from '$shared/content-utils'
    import type { Tool, ToolsContent } from '$shared/types'
    import Heading from '$shared/components/Heading.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'
    import Link from '$shared/components/Link.svelte'
    import Markdown from '$shared/components/Markdown.svelte'
    import RelevantSkills from './RelevantSkills.svelte'
    import Tags from './Tags.svelte'

    $: intro = truncateText(tool.intro ?? tool.description, 300)

    export let tool: Tool
    export let content: ToolsContent

    let tags = tool.tags.map((tagId) => getTag(tagId, content))
</script>

<Link
    href={`/${tool.link}`}
    unstyled
    class="grid max-h-max max-w-2xl justify-self-center"
    tabindex={0}
>
    <div
        class="relative max-h-max transform-gpu rounded-2xl bg-stone-50 p-4 text-stone-900 duration-100 hover:scale-[103%]"
    >
        <div class="flex h-full max-h-max flex-col justify-between">
            <div>
                <Heading size={2}>{tool.name}</Heading>
                <Tags {tags} visible={3} class="pt-2 pr-6" />
                <Markdown source={intro} class="pt-2 pb-4" variant="inverted" />
            </div>
            <RelevantSkills {tool} {content} visible={4} />
        </div>

        <Arrow right class="absolute bottom-5 right-5 mb-1 grid h-6 w-6 place-items-center" />
    </div>
</Link>
