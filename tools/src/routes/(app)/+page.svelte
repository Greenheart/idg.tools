<script lang="ts">
    import { Link, Heading } from '$shared/components'
    import Tools from '$components/Tools.svelte'
    import { persistedState } from '$lib/persisted-state.svelte'
    import type { PageData } from './$types'
    import { getMostRelevantTools } from '$shared/content-utils'
    import Meta from '$components/Meta.svelte'
    import { IDG_PDF_TOOLKIT } from '$shared/constants'
    import SkillTabs from '$components/SkillTabs.svelte'
    import FiltersToolbar from '$components/FiltersToolbar.svelte'

    interface Props {
        data: PageData
    }

    let { data }: Props = $props()
    let { content } = $derived(data)

    let mostRelevantTools = $derived(
        persistedState.selectedSkills.current.length || persistedState.selectedTags.current.length
            ? getMostRelevantTools(
                  content,
                  persistedState.selectedSkills.current,
                  persistedState.selectedTags.current,
              )
            : content.tools,
    )
</script>

<Meta />

<Heading size={1} class="text-collaborating">Change starts within</Heading>

<div class="py-12 text-lg">
    <p>Welcome to the Inner Development Goals Toolkit!</p>

    <p class="mt-4">
        This is an emerging library of tools to explore the <Link href="/framework" variant="black"
            >Inner Development Goals</Link
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
            >.
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
