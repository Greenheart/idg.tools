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
    title="IDG Framework"
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

<!-- TODO: For the framework page, replace the community widget with another call to action to translate and add more locales of the framework -->
