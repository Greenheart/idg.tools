<script lang="ts">
    import { browser } from '$app/environment'
    import type { WidgetContent, Locale } from '$shared/types'

    import allLocales from '$lib/content.json'
    const content = allLocales as Record<Locale, WidgetContent>

    import { IDGFrameworkState } from '$lib/idg-framework.svelte'

    import IdgFramework from '$lib/IDGFramework.svelte'
    import NEW_IDGFramework from '$lib/NEW_IDGFramework.svelte'
    import { DEFAULT_LOCALE_IDENTIFIER } from '$shared/constants'

    // Temporarily control state from the outside to sync it with both implementations
    const widgetState = new IDGFrameworkState(
        // Dev only persistence
        browser
            ? ((localStorage.getItem('idg-locale') as Locale) ?? DEFAULT_LOCALE_IDENTIFIER)
            : DEFAULT_LOCALE_IDENTIFIER,
        content,
    )

    // Dev only persistence
    $effect(() => {
        if (browser) {
            localStorage.setItem('idg-locale', widgetState.locale)
        }
    })
</script>

{#if browser}
    <NEW_IDGFramework {widgetState} />
{/if}

<div style="height: 50vh"></div>

<IdgFramework {widgetState} />

<div style="height: 20vh"></div>
