<script lang="ts">
    import { Divider, Heading, Link } from '$shared/components'

    // import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'
    // import IDGFramework from '$components/IDGFramework.svelte'
    import type { PageData } from './$types'
    import { IDG_REPORT_PDF } from '$shared/constants'
    import IDGInteractiveFramework, {
        type FrameworkData,
    } from '$components/IDGInteractiveFramework.svelte'
    import { getIDGFrameworkData } from '$lib/getIDGFrameworkData'
    import type { HierarchyCircularNode } from 'd3'
    import { getDimension, getSkill } from '$shared/content-utils'

    // TODO: find a way to use the page url without the store, since that causes some error
    // const url = $page.url.toString()

    export let data: PageData
    $: ({ skills, dimensions } = data)

    $: frameworkData = getIDGFrameworkData(dimensions, skills)

    let selected: HierarchyCircularNode<FrameworkData>

    $: selectedSkill = selected?.data?.id ? getSkill(selected?.data?.id, { skills }) : null
    $: selectedDimension = selected?.data?.id
        ? getDimension(selected?.data?.id, { dimensions })
        : null
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<!-- <Heading size={1} class="text-collaborating">IDG Framework</Heading>

<div class="py-12 text-lg">
    <p>
        The 5 dimensions with the 23 skills and qualities. Read the full report <Link
            href={IDG_REPORT_PDF}
            variant="black"
            >“Inner Development Goals: Background, method and the IDG framework”</Link
        > to learn more.
    </p>
</div> -->

<!-- <IDGFramework {skills} {dimensions} /> -->

<div class="grid grid-cols-[1fr_400px]">
    <!-- TODO: Maybe use a svelte store instead of a prop in order to make it easier to susbscribe to updates -->
    <IDGInteractiveFramework data={frameworkData} bind:activeFocus={selected} />
    <div class="bg-green-400 p-4">
        <Heading size={2} class="mt-4 mb-4"
            >{selectedSkill?.name || selectedDimension?.name || 'Inner Development Goals'}</Heading
        >
        {#if selectedSkill}
            <p>{selectedSkill.description}</p>
        {:else if selectedDimension}
            <p>{selectedDimension.description}</p>
        {:else}
            <p>
                The 5 dimensions with the 23 skills and qualities. Read the full report <Link
                    href={IDG_REPORT_PDF}
                    variant="black"
                    >“Inner Development Goals: Background, method and the IDG framework”</Link
                > to learn more.
            </p>
        {/if}
    </div>
</div>

<Divider class="my-16" />
