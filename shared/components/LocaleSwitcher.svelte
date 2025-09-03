<script lang="ts">
    import { Select } from 'bits-ui'
    import { cubicOut } from 'svelte/easing'
    import { goto } from '$app/navigation'

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

    const items = Object.entries(supportedLocales)
        .map(([value, label]) => ({ value, label }))
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
</script>

<Select.Root
    type="single"
    value={initialLocale}
    {items}
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
                {#each items as { value, label } (value)}
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
