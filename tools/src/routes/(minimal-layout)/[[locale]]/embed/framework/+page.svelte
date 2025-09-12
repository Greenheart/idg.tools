<script lang="ts">
    import { page } from '$app/state'
    import Meta from '$components/Meta.svelte'
    import IDGFramework from '$components/IDGFramework.svelte'
    import { parseDimensionSlug } from '$shared/content-utils'
    import { browser } from '$app/environment'
    import { bodyClass } from '$shared/utils'

    let { data } = $props()

    // Ensure the page re-renders when the locale changes.
    const dimensions = $derived(page && data.dimensions)
    const skills = $derived(page && data.skills)
    const symbols = $derived(page && data.symbols)

    const lockedDimension = $derived(
        browser ? parseDimensionSlug(page.url.hash.toLowerCase().replace('#', '')) : undefined,
    )
</script>

<Meta
    title="Inner Development Goals Framework"
    description="The {dimensions.length} dimensions with the {skills.length} skills and qualities"
/>

<svelte:body use:bodyClass={'bg-white'} />

<div class="xs:px-2">
    <IDGFramework
        {dimensions}
        {skills}
        {symbols}
        pathname={page.url.pathname}
        {lockedDimension}
        currentLocale={page.params.locale}
        supportedLocales={data.supportedLocales}
    />
</div>
