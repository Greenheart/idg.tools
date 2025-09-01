<script lang="ts">
    import { tick } from 'svelte'
    import { Link, MenuButton, LocaleSwitcher } from '$shared/components'
    import { isMenuOpen, scrollbarWidth } from '$lib/stores'
    import { onKeydown } from '$lib/utils'
    import { beforeNavigate } from '$app/navigation'
    import type { SupportedLocales } from '$shared/types'
    import { page } from '$app/state'

    interface Props {
        supportedLocales?: SupportedLocales | undefined
    }

    let { supportedLocales = undefined }: Props = $props()

    const toggleMenu = async () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        $isMenuOpen = !$isMenuOpen
        document.documentElement.classList.toggle('overflow-y-scroll', !$isMenuOpen)
        document.documentElement.classList.toggle('overflow-hidden', $isMenuOpen)
        document.documentElement.style.paddingRight = $isMenuOpen ? `${$scrollbarWidth}px` : ''
    }

    beforeNavigate(async () => {
        if ($isMenuOpen) {
            toggleMenu()
            await tick()
        }
    })

    const links = [
        { href: '/about', text: 'About' },
        { href: 'https://innerdevelopmentgoals.org', text: 'IDG website' },
    ]
</script>

<header class="relative flex items-center justify-between pb-12 pt-6">
    <Link href="/" unstyled class="z-30 flex h-[60px] items-center gap-4">
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="112" height="60" />
        <div class="h-full w-px bg-black"></div>
        <span>Toolkit</span>
    </Link>

    <div class="z-30 md:hidden">
        <MenuButton isOpen={$isMenuOpen} onToggle={toggleMenu} />
    </div>

    {#if $isMenuOpen}
        <button
            class="xs:text-4xl bg-lightGray fixed inset-0 z-20 flex h-full w-full flex-col items-center justify-center overflow-y-scroll text-3xl font-semibold"
            onclick={toggleMenu}
            onkeydown={onKeydown(toggleMenu)}
        >
            {#each links as { href, text }}
                <Link {href} class="p-4" variant="black">{text}</Link>
            {/each}
        </button>
    {/if}

    <!-- NOTE: Breakpoints might be messed up by the negative margins that extend the actual width of the layout -->
    <!-- TODO: Ideally try to implement the layout without negative margins and offsets everywhere. -->
    <nav class="z-10 hidden md:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2 px-3 text-base" variant="black">{text}</Link>
        {/each}
        <!-- Only show locales for pages where it makes sense -->
        {#if page?.route?.id?.includes('/framework') && supportedLocales}
            <LocaleSwitcher {supportedLocales} pathname={page.url.pathname} />
        {/if}
    </nav>
</header>
