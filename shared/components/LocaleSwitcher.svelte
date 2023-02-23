<script lang="ts">
    import { Menu, MenuButton, MenuItems, MenuItem } from '@rgossiaux/svelte-headlessui'
    import type { Locale, SupportedLocales } from '../types'
    import Link from './Link.svelte'
    import LocaleIcon from '../icons/Locale.svelte'
    import { getLocalizedPath } from '../utils'

    export let supportedLocales: SupportedLocales

    const supported = Object.entries(supportedLocales) as [Locale, string][]
</script>

<Menu class="relative grid">
    <MenuButton class="grid place-items-center"><LocaleIcon /></MenuButton>
    <MenuItems class="bg-being absolute bottom-0 grid">
        {#each supported as [locale, label]}
            <MenuItem let:active>
                <!-- TODO: verify that keyboard navigation works as expected -->
                <Link
                    href={getLocalizedPath(locale, location.pathname)}
                    variant="black"
                    class={active ? 'text-collaborating' : 'text-being'}>{label}</Link
                >
            </MenuItem>
        {/each}
    </MenuItems>
</Menu>
