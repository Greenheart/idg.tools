<script lang="ts">
    import { page } from '$app/state'
    import Meta from '$components/Meta.svelte'
    import IDGFramework from '$components/IDGFramework.svelte'
    import { parseDimensionSlug } from '$shared/content-utils'
    import { browser } from '$app/environment'
    import { bodyClass } from '$shared/utils'
    import { IsMounted } from 'runed'

    let { data } = $props()

    // Ensure the page re-renders when the locale changes.
    const dimensions = $derived(page && data.dimensions)
    const skills = $derived(page && data.skills)
    const symbols = $derived(page && data.symbols)

    let mounted = new IsMounted()

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
    <!--
    NOTE: We need to wait for the client-side mounting before rendering, to make it possible to show another default tab than the first one.

    This is because we use the URL hash to determine the selected dimension, which is not available during SSR.$$render
    When the lockedDimension starts as undefined on the server and then is set on the client side,
    this causes the bits-ui tab component to not show any of the tabs

    NOTE: This might be a bug in the bits-ui Tabs component

    IDEA: An alternative might be to manually remove the hidden attribute on the desired tab after mount?
    -->
    {#if mounted.current}
        <IDGFramework
            {dimensions}
            {skills}
            {symbols}
            pathname={page.url.pathname}
            {lockedDimension}
            currentLocale={page.params.locale}
            supportedLocales={data.supportedLocales}
        />
    {/if}
</div>
