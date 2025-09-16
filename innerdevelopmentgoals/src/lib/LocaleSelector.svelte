<script lang="ts">
    import { Select, type SelectRootProps } from 'bits-ui'
    import { cubicOut } from 'svelte/easing'

    import type { Locale, SupportedLocales } from '$shared/types'
    import LocaleIcon from './icons/Locale.svelte'
    import ChevronDown from './icons/ChevronDown.svelte'

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

    /** Use a suffix to make select values unique. This is needed to only highlight one item at a time. */
    const recommendedSuffix = '-r'

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
</script>

<Select.Root
    type="single"
    bind:value={
        () => locale, (value) => onChangeLocale(value.replace(recommendedSuffix, '') as Locale)
    }
    items={sortedLocales}
    onOpenChange={hideViewportDuringScrollReset}
    onOpenChangeComplete={scrollViewportToTop}
>
    <Select.Trigger aria-label="Change language" title="Change language" class="locale"
        ><LocaleIcon />{supportedLocales[locale]}<ChevronDown /></Select.Trigger
    >
    <Select.Portal>
        <Select.Content class="idg-locale-list">
            <Select.ScrollUpButton delay={autoScrollDelay}>
                <ChevronDown />
            </Select.ScrollUpButton>
            <Select.Viewport class="invisible" bind:ref={selectViewport}>
                {#each recommendedLocales as { value, label }, i (i)}
                    <Select.Item
                        value={value + recommendedSuffix}
                        class="grid hover:bg-stone-200 [&[data-highlighted]]:bg-stone-200 [&[data-highlighted]]:underline"
                    >
                        <span class="px-3 py-1">{label}</span>
                    </Select.Item>
                {/each}

                <hr />

                {#each sortedLocales as { value, label } (value)}
                    <Select.Item
                        {value}
                        class="grid hover:bg-stone-200 [&[data-highlighted]]:bg-stone-200 [&[data-highlighted]]:underline"
                    >
                        <span class="px-3 py-1">{label}</span>
                    </Select.Item>
                {/each}
            </Select.Viewport>
            <!-- IDEA: Make the total height of the viewport less glitchy as the buttons appear and dissapear -->
            <Select.ScrollDownButton delay={autoScrollDelay}>
                <ChevronDown />
            </Select.ScrollDownButton>
        </Select.Content>
    </Select.Portal>
</Select.Root>
