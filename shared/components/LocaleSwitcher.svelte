<script lang="ts">
    import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui'
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { cx, getLocalisedPath } from '../utils'

    export let supportedLocales: SupportedLocales

    const supported = Object.entries(supportedLocales) as [Locale, string][]
</script>

<Menu class="relative grid">
    <MenuButton
        class="grid place-items-center hover:bg-stone-100 h-10 w-10"
        title="Change language"
        aria-label="Change language"><LocaleIcon /></MenuButton
    >
    <MenuItems
        class="bg-white list-style-none absolute top-full right-0 grid text-base drop-shadow z-30"
        as="ul"
    >
        {#each supported as [locale, label]}
            <MenuItem let:active as="li" class="grid first:pt-1 last:pb-1">
                <!-- TODO: verify that keyboard navigation works as expected -->
                <Link
                    href={getLocalisedPath(locale, location.pathname)}
                    variant="black"
                    class={cx('px-3 py-1', active ? 'underline bg-stone-100' : 'no-underline')}
                    >{label}</Link
                >
            </MenuItem>
        {/each}
    </MenuItems>
</Menu>
