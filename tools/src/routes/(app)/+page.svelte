<script lang="ts">
    import { onMount } from 'svelte'

    import { Link, Heading } from '$shared/components'
    import Tools from '$components/Tools.svelte'
    import { globalState } from '$lib/global-state.svelte'
    import type { PageData } from './$types'
    import { getMostRelevantTools } from '$shared/content-utils'
    import Meta from '$components/Meta.svelte'
    import { FRAMEWORK_LINK, IDG_PDF_TOOLKIT } from '$shared/constants'
    import SkillTabs from '$components/SkillTabs.svelte'
    import { FEEDBACK_FORM_LINK, SUGGEST_NEW_TOOL_LINK } from '$lib/constants'
    import FiltersToolbar from '$components/FiltersToolbar.svelte'

    interface Props {
        data: PageData
    }

    let { data }: Props = $props()
    let { content } = $derived(data)

    onMount(() => {
        // NOTE: Maybe we could limit the number of re-renders by showing a loading state until all of these have updated?
        // selectedSkills.useLocalStorage()
        // selectedTags.useLocalStorage()
    })

    let mostRelevantTools = $derived(
        globalState.selectedSkills.length || globalState.selectedTags.length
            ? getMostRelevantTools(content, globalState.selectedSkills, globalState.selectedTags)
            : content.tools,
    )
</script>

<Meta />

<Heading size={1} class="text-collaborating">Change starts within</Heading>

<div class="py-12 text-lg">
    <p>Welcome to the Inner Development Goals Toolkit!</p>

    <p class="mt-4">
        This is an emerging library of tools to explore the <Link
            href={FRAMEWORK_LINK}
            variant="black">Inner Development Goals</Link
        > (IDGs) in practice, and help people and organisations accelerate progress towards the <Link
            href="https://sdgs.un.org/goals#goals"
            variant="black">UN Sustainable Development Goals</Link
        > (SDGs).
    </p>

    <div class="mt-6 bg-black p-4 text-white">
        <p class="pb-4">
            This is the public beta version of the IDG Toolkit. It is primarily based on the <Link
                href={IDG_PDF_TOOLKIT}
                variant="white">IDG Phase 2 Research Report</Link
            >, and research from <Link href="https://29k.org" variant="white">29k</Link>. Please <Link
                href={FEEDBACK_FORM_LINK}
                variant="white">share your feedback</Link
            > and <Link href={SUGGEST_NEW_TOOL_LINK} variant="white">suggest new tools</Link>.
        </p>
        <Link href="/about" variant="orange" class="whitespace-nowrap text-right">Learn more</Link>
    </div>
</div>

<SkillTabs {content} />

<div id="explore" class="pt-60 sm:pt-48 md:pt-40">
    <FiltersToolbar {mostRelevantTools} {content} />
</div>

<Heading size={2} class="pb-4 pt-8">2. Explore relevant tools</Heading>
<Tools {mostRelevantTools} {content} />
