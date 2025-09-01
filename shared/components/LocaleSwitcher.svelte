<script lang="ts">
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { getLocalisedPath } from '../utils'
    import { DEFAULT_LOCALE_IDENTIFIER, LOCALES } from '../constants'
    import ChevronDown from '../icons/ChevronDown.svelte'

    export let supportedLocales: SupportedLocales
    export let pathname: string
    export let currentLocale: string = DEFAULT_LOCALE_IDENTIFIER

    // Sort supported languages based on number of speakers
    const supported = Object.keys(LOCALES).reduce((result, locale) => {
        if (supportedLocales[locale]) {
            result.push([locale, supportedLocales[locale]])
        }
        return result
    }, []) as [Locale, string][]

    let open = false
    let target: HTMLDivElement
</script>

<div class="relative grid" bind:this={target}>
    <button
        class="flex h-10 items-center gap-2 px-2 hover:bg-stone-100"
        title="Change language"
        aria-label="Change language"
        on:click={() => (open = !open)}
        ><LocaleIcon />{supportedLocales[currentLocale ?? DEFAULT_LOCALE_IDENTIFIER]}<ChevronDown
        /></button
    >
    <ul
        class="list-style-none absolute top-full z-30 grid w-48 bg-white py-1 text-base drop-shadow ltr:right-0 rtl:left-0"
        class:hidden={!open}
    >
        {#each supported as [locale, label]}
            <li class="grid">
                <Link
                    href={getLocalisedPath(locale, pathname)}
                    variant="black"
                    noScroll
                    on:click={() => {
                        open = false
                    }}
                    class="px-3 py-1 !no-underline hover:bg-stone-100 hover:underline">{label}</Link
                >
            </li>
        {/each}
    </ul>
</div>

<svelte:body
    on:click={(event) => {
        if (open && !event.composedPath().includes(target)) {
            open = false
        }
    }}
    on:keyup={(event) => {
        if (open && event.key === 'Escape') {
            open = false
        }
    }}
/>
