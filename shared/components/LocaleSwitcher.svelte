<script lang="ts">
    import { Select } from 'bits-ui'
    import { cubicOut } from 'svelte/easing'
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'

    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { getLocalisedPath } from '../utils'
    import { DEFAULT_LOCALE_IDENTIFIER } from '../constants'
    import ChevronDown from '../icons/ChevronDown.svelte'

    interface Props {
        supportedLocales: SupportedLocales
        pathname: string
        currentLocale?: string
    }

    let { supportedLocales, pathname, currentLocale = DEFAULT_LOCALE_IDENTIFIER }: Props = $props()

    const locales = Object.entries(supportedLocales)
        .map<{ value: Locale; label: string }>(([value, label]) => ({ value, label }))
        .sort((a, b) => a.label.localeCompare(b.label))

    let initialLocale = $derived<Locale>(
        supportedLocales[currentLocale as Locale]
            ? (currentLocale as Locale)
            : DEFAULT_LOCALE_IDENTIFIER,
    )

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
        if (!browser) return mostCommon

        const preferred: Locale[] = []

        for (const { value } of locales) {
            // Handle both exact matches and if only the language matches
            if (
                navigator.languages.some(
                    (lang) => value === lang || value.startsWith(lang.split('-').at(0)),
                )
            ) {
                preferred.push(value)
            }
        }

        // Only include one entry for each recommended locale,
        // showing the user's preferred locales at the top.
        return Array.from(new Set([...preferred, ...mostCommon]))
    }

    const recommendedLocales = getRecommendedLocales().map((value) => ({
        value,
        label: supportedLocales[value],
    }))
</script>

<Select.Root
    type="single"
    value={initialLocale}
    items={locales}
    onValueChange={(value) => {
        goto(getLocalisedPath(value as Locale, pathname))
    }}
>
    <Select.Trigger
        aria-label="Change language"
        title="Change language"
        class="flex h-10 items-center gap-2 px-2 hover:bg-stone-100"
        ><LocaleIcon />{supportedLocales[initialLocale]}<ChevronDown /></Select.Trigger
    >
    <Select.Portal>
        <Select.Content class="z-30 grid w-48 bg-white text-base drop-shadow" preventScroll={true}>
            <Select.ScrollUpButton class="grid place-items-center" delay={autoScrollDelay}>
                <ChevronDown class="!size-4 rotate-180 transform" />
            </Select.ScrollUpButton>
            <Select.Viewport class="max-h-screen">
                {#if browser}
                    {#each recommendedLocales as { value, label }, i ((value, i))}
                        <!-- TODO: Ensure highlighted style only shows for one item at a time -->
                        <!-- IDEA: Maybe add hover: and focus-within: prefixes for data-highlighted classes -->
                        <Select.Item
                            {value}
                            class="grid hover:bg-stone-200 [&[data-highlighted]]:bg-stone-200 [&[data-highlighted]_a]:!underline"
                        >
                            <Link
                                href={getLocalisedPath(value, pathname)}
                                variant="black"
                                noScroll
                                class="px-3 py-1 !no-underline">{label}</Link
                            >
                        </Select.Item>
                    {/each}
                {/if}

                <hr class="my-1" />

                {#each locales as { value, label } (value)}
                    <Select.Item
                        {value}
                        class="grid hover:bg-stone-200 [&[data-highlighted]]:bg-stone-200 [&[data-highlighted]_a]:!underline"
                    >
                        <Link
                            href={getLocalisedPath(value, pathname)}
                            variant="black"
                            noScroll
                            class="px-3 py-1 !no-underline">{label}</Link
                        >
                    </Select.Item>
                {/each}
            </Select.Viewport>
            <Select.ScrollDownButton class="grid place-items-center" delay={autoScrollDelay}>
                <ChevronDown class="!size-4" />
            </Select.ScrollDownButton>
        </Select.Content>
    </Select.Portal>
</Select.Root>
