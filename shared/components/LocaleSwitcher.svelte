<script lang="ts">
    import { Select } from 'bits-ui'
    import { cubicOut } from 'svelte/easing'

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

    const items = supportedLocales
        .entries()
        .map(([value, label]) => ({ value, label }))
        .toArray()

    let initialLocale = $derived<Locale>(
        supportedLocales.has(currentLocale as Locale)
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
        ><LocaleIcon />{supportedLocales.get(initialLocale)}<ChevronDown /></Select.Trigger
    >
    <Select.Portal>
        <!-- TODO: show items in alphabetical order. Simplify supportedLocales since we don't need custom sorting anymore -->
        <Select.Content class="z-30 grid w-48 bg-white text-base drop-shadow" preventScroll={true}>
            <Select.ScrollUpButton class="grid place-items-center" delay={autoScrollDelay}>
                <ChevronDown class="!size-4 rotate-180 transform" />
            </Select.ScrollUpButton>
            <Select.Viewport class="max-h-screen">
                {#each items as { value, label } (value)}
                    <Select.Item
                        {value}
                        class="hover:bg-stone-100 [&[data-highlighted]]:bg-stone-100 [&[data-highlighted]]:!underline"
                    >
                        <li class="grid">
                            <Link
                                href={getLocalisedPath(value, pathname)}
                                variant="black"
                                noScroll
                                class="px-3 py-1">{label}</Link
                            >
                        </li>
                    </Select.Item>
                {/each}
            </Select.Viewport>
            <Select.ScrollDownButton class="grid place-items-center" delay={autoScrollDelay}>
                <ChevronDown class="!size-4" />
            </Select.ScrollDownButton>
        </Select.Content>
    </Select.Portal>
</Select.Root>
