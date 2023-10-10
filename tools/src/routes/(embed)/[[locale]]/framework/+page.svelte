<script lang="ts">
    import { derived } from 'svelte/store'

    import { page } from '$app/stores'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import IDGFramework from '$components/IDGFramework.svelte'

    export let data: PageData

    // Ensure the page re-renders when the locale changes.
    const dimensions = derived(page, () => data.dimensions)
    const skills = derived(page, () => data.skills)
    const symbols = derived(page, () => data.symbols)
</script>

<Meta
    title="Inner Development Goals Framework"
    description="The {$dimensions.length} dimensions with the {$skills.length} skills and qualities"
/>

<IDGFramework
    {dimensions}
    {skills}
    {symbols}
    pathname={$page.url.pathname}
    currentLocale={$page.params.locale}
    supportedLocales={data.supportedLocales}
/>

<!-- TODO: for the embedded framework, make sure to add the script that resizes the iframe based on its content -->
