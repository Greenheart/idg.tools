<script lang="ts">
    import { derived } from 'svelte/store'

    import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import IDGFramework from '$components/IDGFramework.svelte'
    import { parseDimensionSlug } from '$shared/content-utils'
    import { browser } from '$app/environment'
    import { bodyClass } from '$shared/utils'

    export let data: PageData

    // Ensure the page re-renders when the locale changes.
    const dimensions = derived(page, () => data.dimensions)
    const skills = derived(page, () => data.skills)
    const symbols = derived(page, () => data.symbols)

    const selectedDimension = derived(page, () =>
        browser ? parseDimensionSlug($page.url.hash.toLowerCase().replace('#', '')) : undefined,
    )
</script>

<Meta
    title="Inner Development Goals Framework"
    description="The {$dimensions.length} dimensions with the {$skills.length} skills and qualities"
/>

<svelte:body use:bodyClass={'bg-white'} />

<!--
    TODO: Find a way to allow server rendering the tabs and their content.
    The real issue is that the tabs render partially and then flash with the final content
-->
<div class="xs:px-2">
    <IDGFramework
        {dimensions}
        {skills}
        {symbols}
        pathname={$page.url.pathname}
        {selectedDimension}
        currentLocale={$page.params.locale}
        supportedLocales={data.supportedLocales}
    />
</div>
