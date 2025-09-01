<script lang="ts">
    import { truncateText } from '$lib/utils'
    import { getTag } from '$shared/content-utils'
    import type { Tool, ToolsContent } from '$shared/types'
    import { Heading, Link, Markdown } from '$shared/components'
    import { Arrow } from '$shared/icons'
    import RelevantSkills from './RelevantSkills.svelte'
    import Tags from './Tags.svelte'

    interface Props {
        tool: Tool
        content: ToolsContent
    }

    let { tool, content }: Props = $props()

    let tags = tool.tags.map((tagId) => getTag(tagId, content))
    let intro = $derived(truncateText(tool.intro ?? tool.description, 300))
</script>

<Link
    href={`/${tool.link}`}
    unstyled
    class="grid max-h-max max-w-2xl justify-self-center"
    tabindex={0}
>
    <div
        class="relative max-h-max transform-gpu bg-white p-4 shadow-md duration-100 hover:scale-[103%]"
    >
        <div class="flex h-full max-h-max flex-col justify-between">
            <div>
                <Heading size={2}>{tool.name}</Heading>
                <Tags {tags} visible={3} class="pr-6 pt-2" />
                <Markdown source={intro} class="pb-4 pt-2" />
            </div>
            <RelevantSkills {tool} {content} visible={4} />
        </div>

        <Arrow right class="absolute bottom-5 right-5 grid h-6 w-6 place-items-center" />
    </div>
</Link>
