<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Tools from '$components/Tools.svelte'
    import { selectedSkills, selectedTags } from '$lib/stores'
    import type { PageData } from './$types'
    import { getMostRelevantTools } from '$shared/content-utils'
    import Meta from '$components/Meta.svelte'
    import { FRAMEWORK_LINK } from '$shared/constants'
    import SkillTabs from '$components/SkillTabs.svelte'

    export let data: PageData
    $: ({ content } = data)

    onMount(() => {
        // NOTE: Maybe we could limit the number of re-renders by showing a loading state until all of these have updated?
        selectedSkills.useLocalStorage()
        selectedTags.useLocalStorage()
    })

    $: mostRelevantTools =
        $selectedSkills.length || $selectedTags.length
            ? getMostRelevantTools(content, $selectedSkills, $selectedTags)
            : content.tools
</script>

<Meta />

<Heading size={1} class="text-collaborating">Change starts within</Heading>

<div class="py-12 text-lg">
    <p>Welcome to the Inner Development Goals Toolkit!</p>

    <p class="mt-4">
        This is an emerging library of tools to explore the <Link
            href={FRAMEWORK_LINK}
            variant="black">Inner Development Goals</Link
        > (IDGs) in practice, and help people and organizations reach the <Link
            href="https://sdgs.un.org/goals#goals"
            variant="black">UN Sustainable Development Goals</Link
        > (SDGs).
    </p>

    <div class="mt-4 bg-black p-4 text-white">
        <!-- TODO: clarify that this is a work in progress -->
        <p class="pb-4">
            This early version is primarily based on the <Link
                href="/assets/220927_IDG_Toolkit_v6.pdf"
                variant="white">IDG Phase 2 Research Report</Link
            >. Now, you're invited to explore the IDGs in practice, and help make this toolkit even
            better!
        </p>
        <Link href="/about" variant="orange" class="whitespace-nowrap text-right">Learn more</Link>
    </div>
</div>

<SkillTabs {content} />

<Heading size={2} class="pb-4 pt-60 sm:pt-48 md:pt-40" id="explore"
    >2. Explore relevant tools</Heading
>
<div class="grid gap-8 lg:grid-cols-2">
    <Tools tools={mostRelevantTools} {content} />
</div>
