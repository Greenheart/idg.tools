<script lang="ts">
    import { onMount } from 'svelte'

    import Link from '$shared/components/Link.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Tools from '$components/Tools.svelte'
    import { selectedSkills, selectedTags, visibleItems } from '$lib/stores'
    import type { PageData } from './$types'
    import { getMostRelevantTools } from '$shared/content-utils'
    import Filters from '$components/Filters.svelte'
    import { FEEDBACK_FORM_LINK } from '$lib/constants'
    import Meta from '$components/Meta.svelte'

    export let data: PageData
    $: ({ content } = data)

    onMount(() => {
        // NOTE: Maybe we could limit the number of re-renders by showing a loading state until all of these have updated?
        selectedSkills.useLocalStorage()
        selectedTags.useLocalStorage()
        visibleItems.useLocalStorage()
    })

    $: mostRelevantTools =
        $selectedSkills.length || $selectedTags.length
            ? getMostRelevantTools(content, $selectedSkills, $selectedTags)
            : content.tools
</script>

<Meta />

<Heading size={1} class="text-relating">Change starts within</Heading>

<div class="space-y-4 pt-12 pb-16 text-lg sm:text-xl">
    <p>
        IDG.tools is the open source toolkit from the <Link
            href="https://www.innerdevelopmentgoals.org/framework"
            class="mt-6 font-bold underline">Inner Development Goals</Link
        > (IDGs) non-profit initiative. The initiative is working to achieve the <Link
            href="https://sdgs.un.org/goals#goals"
            class="font-bold underline">UN Sustainable Development Goals</Link
        > (SDGs) through inner development.
    </p>

    <!-- TODO: Change the framing that this is a first draft -->

    <p>
        We’re creating a library of scientifically-validated methods to develop the skills outlined
        by the IDG framework. Just select which ones you want to practice and find tools relevant
        for you.
    </p>

    <p>
        This toolkit is co-created by and for the community, and primarily contains methods from the <Link
            href="/assets/220927_IDG_Toolkit_v6.pdf"
            class="font-underline font-bold">IDG Phase 2 Research Report</Link
        >. Next, we want to add more tools and resources, and make IDG.tools even better. <Link
            href={FEEDBACK_FORM_LINK}
            class="font-underline font-bold">With your support</Link
        >, we can make it happen!
    </p>
</div>

<Heading size={2} class="pb-4">1. Choose skills to practice</Heading>
<Filters {content} />

<Heading size={2} class="pb-4 pt-20" id="explore">2. Explore relevant tools</Heading>
<div class="grid gap-8 lg:grid-cols-2">
    <Tools tools={mostRelevantTools} {content} />
</div>
