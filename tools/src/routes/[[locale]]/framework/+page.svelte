<script lang="ts">
    import Divider from '$shared/components/Divider.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'

    import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'
    import IdgFramework from '$components/IDGFramework.svelte'
    import type { PageData } from './$types'
    import { IDG_REPORT_PDF } from '$shared/constants'

    const url = $page.url.toString()

    export let data: PageData
    $: ({ skills, dimensions } = data)
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" {url} />

<Heading size={1} class="text-collaborating">IDG Framework</Heading>

<div class="py-12 text-lg">
    <p>
        The 5 dimensions with the 23 skills and qualities. Read the full report <Link
            href={IDG_REPORT_PDF}
            variant="black"
            >“Inner Development Goals: Background, method and the IDG framework”</Link
        > to learn more.
    </p>
</div>

<IdgFramework {skills} {dimensions} />

<Divider class="my-16" />
