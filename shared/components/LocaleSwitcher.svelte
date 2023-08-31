<script lang="ts">
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { getLocalisedPath } from '../utils'

    export let supportedLocales: SupportedLocales
    export let pathname: string

    const supported = Object.entries(supportedLocales) as [Locale, string][]

    let open = false
</script>

<!-- TODO: implement ESC to close -->
<!-- TODO: implement click outside -->
<!-- TODO: close when clicking on one of the links -->
<div class="relative grid">
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
                <!-- TODO: verify that keyboard navigation works as expected -->
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

<!-- <Menu class="relative grid">
    <MenuButton
        class="grid place-items-center hover:bg-stone-100 h-10 w-10"
        title="Change language"
        aria-label="Change language"><LocaleIcon /></MenuButton
    >
    <MenuItems
        class="bg-white list-style-none absolute top-full right-0 grid text-base drop-shadow"
        as="ul"
    >
        {#each supported as [locale, label]}
            <MenuItem let:active as="li" class="grid first:pt-1 last:pb-1">
                <Link
                    href={getLocalisedPath(locale, location.pathname)}
                    variant="black"
                    class={cx('px-3 py-1', active ? 'bg-stone-100' : 'no-underline')}>{label}</Link
                >
            </MenuItem>
        {/each}
    </MenuItems>
</Menu> -->
