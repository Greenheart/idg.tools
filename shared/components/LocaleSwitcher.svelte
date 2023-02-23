<script lang="ts">
    import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui'
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { cx, getLocalizedPath } from '../utils'

    export let supportedLocales: SupportedLocales

    const supported = Object.entries(supportedLocales) as [Locale, string][]
</script>

<Menu class="relative grid p-2">
    <MenuButton class="grid place-items-center" title="Change language" aria-label="Change language"
        ><LocaleIcon /></MenuButton
    >
    <MenuItems
        class="bg-being list-style-none absolute top-full right-0 grid space-y-1 p-3 text-base"
        as="ul"
    >
        {#each supported as [locale, label]}
            <MenuItem let:active as="li">
                <!-- TODO: verify that keyboard navigation works as expected -->
                <Link
                    href={getLocalizedPath(locale, location.pathname)}
                    variant="black"
                    class={cx('py-2', active ? 'text-collaborating' : 'text-being')}>{label}</Link
                >
            </MenuItem>
        {/each}
    </MenuItems>
</Menu>
