<script lang="ts">
    import { truncateText } from '$lib/utils'
    import type { Tool, Content } from '$shared/types'
    import Heading from './Heading.svelte'
    import Arrow from './icons/Arrow.svelte'
    import Link from './Link.svelte'
    import Markdown from './Markdown.svelte'
    import RelevantSkills from './RelevantSkills.svelte'
    import Tags from './Tags.svelte'

    const introLength = 300

    $: intro = truncateText(tool.description, introLength)

    export let tool: Tool
    export let content: Content
</script>

<Link href={`/${tool.link}`} unstyled class="grid max-h-[392px] max-w-2xl">
    <div
        class="relative max-h-[392px] transform-gpu rounded-2xl bg-stone-50 p-4 text-stone-900 duration-100 hover:scale-[103%]"
    >
        <div class="flex h-full max-h-[360px] flex-col justify-between">
            <div>
                <Heading size={2}>{tool.name}</Heading>
                <Tags {tool} {content} visible={3} class="pt-2" />
                <Markdown source={intro} class="pt-2 pb-4" variant="inverted" />
            </div>
            <!-- <div> -->
            <!-- NOTE: Either remove heading or keep pb-2 instead to make it more compact -->
            <!-- <Heading size={4} class="pb-2">Skills you'll practice</Heading> -->
            <RelevantSkills {tool} {content} visible={4} />
            <!-- </div> -->
        </div>

        <Arrow
            class="absolute bottom-5 right-5 mb-1 grid h-6 w-6 place-items-center"
        />
    </div>
</Link>
