<script lang="ts">
    import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui'
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { cx, getLocalisedPath } from '../utils'

    export let supportedLocales: SupportedLocales

    const supported = Object.entries(supportedLocales) as [Locale, string][]
</script>

<Menu class="relative grid p-2">
    <MenuButton class="grid place-items-center" title="Change language" aria-label="Change language"
        ><LocaleIcon /></MenuButton
    >
    <MenuItems
        class="bg-being list-style-none absolute top-full right-0 grid text-base shadow-md"
        as="ul"
    >
        {#each supported as [locale, label]}
            <MenuItem let:active as="li" class="grid first:pt-1 last:pb-1">
                <!-- TODO: verify that keyboard navigation works as expected -->
                <Link
                    href={getLocalisedPath(locale, location.pathname)}
                    variant="black"
                    class={cx('px-3 py-1', active ? 'text-white' : '')}>{label}</Link
                >
            </MenuItem>
        {/each}
    </MenuItems>
</Menu>
