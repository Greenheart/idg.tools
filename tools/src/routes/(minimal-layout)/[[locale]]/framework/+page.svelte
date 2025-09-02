<script lang="ts">
    import { page } from '$app/state'
    import Meta from '$components/Meta.svelte'
    import IDGFramework from '$components/IDGFramework.svelte'
    import { browser } from '$app/environment'
    import { parseDimensionSlug } from '$shared/content-utils.js'

    let { data } = $props()

    // Ensure the page re-renders when the locale changes.
    const dimensions = $derived(page && data.dimensions)
    const skills = $derived(page && data.skills)
    const symbols = $derived(page && data.symbols)

    const selectedDimension = $derived(
        browser ? parseDimensionSlug(page.url.hash.toLowerCase().replace('#', '')) : undefined,
    )
</script>

<Meta
    title="Inner Development Goals Framework"
    description="The {dimensions.length} dimensions with the {skills.length} skills and qualities"
/>

<IDGFramework
    {dimensions}
    {skills}
    {symbols}
    pathname={page.url.pathname}
    currentLocale={page.params.locale}
    supportedLocales={data.supportedLocales}
    {selectedDimension}
/>
