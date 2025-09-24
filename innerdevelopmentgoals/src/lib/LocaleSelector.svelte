<script lang="ts">
    import { Select, type SelectRootProps } from 'bits-ui'
    import { cubicOut } from 'svelte/easing'

    import type { Locale, SupportedLocales } from './types'
    import { onDestroy, onMount } from 'svelte'

    interface Props {
        supportedLocales: SupportedLocales
        locale: Locale
        onChangeLocale: (locale: Locale) => void
    }

    let { supportedLocales, locale, onChangeLocale }: Props = $props()

    const sortedLocales = Object.entries(supportedLocales)
        .map(([value, label]) => ({ value, label }))
        .sort((a, b) => {
            // Special rule: Show pt-BR before pt since it's more common
            if ([a.value, b.value].every((v) => v.includes('pt'))) {
                return a.value === 'pt-BR' ? -1 : 1
            }
            return a.label.localeCompare(b.label)
        }) as { value: Locale; label: string }[]

    let selectViewport = $state<HTMLDivElement | null>(null)
    let open = $state(false)

    function autoScrollDelay(tick: number) {
        const maxDelay = 200
        const minDelay = 25
        const steps = 30

        const progress = Math.min(tick / steps, 1)
        return maxDelay - (maxDelay - minDelay) * cubicOut(progress)
    }

    /**
     * Get recommended locales to show at the top of the list.
     *
     * Includes the user's language preferences from their browser, followed by the most common languages.
     */
    function getRecommendedLocales() {
        // Most common languages according to https://en.wikipedia.org/wiki/List_of_languages_by_total_number_of_speakers
        // Including zh-TW to show we have both variations
        const mostCommon: Locale[] = ['en', 'zh-CN', 'es', 'fr', 'pt-BR', 'pt', 'de', 'ja', 'zh-TW']
        const preferred: Locale[] = []

        for (const { value } of sortedLocales) {
            // Handle both exact matches and if only the language matches
            if (
                navigator.languages.some(
                    (lang) => value === lang || value.startsWith(lang.split('-')[0]),
                )
            ) {
                preferred.push(value)
            }
        }

        // Only include one entry for each recommended locale,
        // showing the user's preferred locales at the top.
        return Array.from(new Set([...preferred, ...mostCommon]))
    }

    /** Use a suffix to make select values unique. This is needed to only highlight one item at a time.
     * By adding this suffix for duplicates appearing later in the list, the first value is highlighted when the select is opened.
     * This prevents unnecessary scrolling to show the first value.
     */
    const regularValueSuffix = '-r'

    const recommendedLocales = getRecommendedLocales().map((value) => ({
        value,
        label: supportedLocales[value],
    }))

    const hideViewportDuringScrollReset: SelectRootProps['onOpenChange'] = (open) => {
        if (!open && selectViewport) {
            selectViewport.classList.add('invisible')
        }
    }

    const scrollViewportToTop: SelectRootProps['onOpenChangeComplete'] = async () => {
        if (selectViewport) {
            // We need to wait for the select to render fully
            await new Promise((r) => setTimeout(r, 10))
            // Ensure the select is scrolled to the top of the list
            selectViewport.scrollTop = 0
            // By making the list invisible, we can work around the fact that the list
            // is not scrolled to the top during the first render
            selectViewport.classList.remove('invisible')
        }
    }

    function clickOutsideIframeHandler() {
        if (open) {
            open = false
        }
    }

    onMount(() => {
        // Improve UX by allowing the select list to be closed by clicking outside the iframe
        if (parent?.document !== document) {
            window.parent.document.addEventListener('click', clickOutsideIframeHandler)
        }
    })

    onDestroy(() => {
        if (parent?.document !== document) {
            window.parent.document.removeEventListener('click', clickOutsideIframeHandler)
        }
    })
</script>

{#snippet Locale()}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
    >
        <path
            fill-rule="evenodd"
            d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
            clip-rule="evenodd"
        />
    </svg>
{/snippet}

{#snippet ChevronDown()}
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
    >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
{/snippet}

<div class="locale-container">
    <Select.Root
        type="single"
        bind:value={
            () => locale, (value) => onChangeLocale(value.replace(regularValueSuffix, '') as Locale)
        }
        bind:open
        items={sortedLocales}
        onOpenChange={hideViewportDuringScrollReset}
        onOpenChangeComplete={scrollViewportToTop}
    >
        <Select.Trigger aria-label="Change language" title="Change language" class="locale"
            >{@render Locale()}
            {supportedLocales[locale]}
            {@render ChevronDown()}
        </Select.Trigger>
        <Select.ContentStatic class="idg-locale-list">
            <Select.ScrollUpButton delay={autoScrollDelay}>
                {@render ChevronDown()}
            </Select.ScrollUpButton>
            <Select.Viewport class="invisible" bind:ref={selectViewport}>
                {#each recommendedLocales as { value, label }, i (i)}
                    <Select.Item {value}>
                        <span>{label}</span>
                    </Select.Item>
                {/each}

                <hr />

                {#each sortedLocales as { value, label } (value)}
                    <Select.Item value={value + regularValueSuffix}>
                        <span>{label}</span>
                    </Select.Item>
                {/each}
            </Select.Viewport>
            <!-- IDEA: Make the total height of the viewport less glitchy as the buttons appear and disappear -->
            <Select.ScrollDownButton delay={autoScrollDelay}>
                {@render ChevronDown()}
            </Select.ScrollDownButton>
        </Select.ContentStatic>
    </Select.Root>
</div>
