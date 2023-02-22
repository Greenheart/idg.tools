<script lang="ts">
    import Divider from '$shared/components/Divider.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'

    import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'
    import IdgFramework from '$components/IDGFramework.svelte'
    import type { PageData } from './$types'

    const url = $page.url.toString()

    export let data: PageData
    $: ({ skills, dimensions } = data)
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" {url} />

<Heading size={1} class="text-collaborating">IDG Framework</Heading>

<!-- NOTE: Maybe have some kind of intro text here, linking to the full report etc -->
<!-- <div class="py-12 text-lg">
    <p>
        The <Link href="https://innerdevelopmentgoals.org" variant="black"
            >Inner Development Goals</Link
        > is a non-profit initiative to bring the power of inner development to all global challenges
        faced by humanity.
    </p>
    <p class="mt-4">
        The <Link href={FRAMEWORK_LINK} variant="black">IDG framework</Link> describes the collective
        inner skills needed to deal with complex global challenges, such as the Sustainable Development
        Goals. The IDG Toolkit aims to be a library of useful methods and approaches to practice these
        skills.
    </p>
</div> -->

<IdgFramework {skills} {dimensions} />

<Divider class="my-16" />
