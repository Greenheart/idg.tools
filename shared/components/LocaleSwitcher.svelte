<script lang="ts">
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { getLocalisedPath } from '../utils'

    export let supportedLocales: SupportedLocales
    export let pathname: string

    const supported = Object.entries(supportedLocales) as [Locale, string][]

    let open = false
    let target: HTMLDivElement
</script>

<div class="relative grid" bind:this={target}>
    <button
        class="grid place-items-center hover:bg-stone-100 h-10 w-10"
        title="Change language"
        aria-label="Change language"
        on:click={() => (open = !open)}><LocaleIcon /></button
    >
    <ul
        class="bg-white list-style-none absolute top-full right-0 grid text-base drop-shadow py-1 z-30"
        class:hidden={!open}
    >
        {#each supported as [locale, label]}
            <li class="grid">
                <Link
                    href={getLocalisedPath(locale, pathname)}
                    variant="black"
                    on:click={() => {
                        open = false
                    }}
                    class="px-3 py-1 hover:bg-stone-100 !no-underline hover:underline">{label}</Link
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
