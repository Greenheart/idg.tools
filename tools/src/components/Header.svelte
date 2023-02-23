<script lang="ts">
    import { tick } from 'svelte'
    import Link from '$shared/components/Link.svelte'
    import MenuButton from '$shared/components/MenuButton.svelte'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { isMenuOpen, scrollbarWidth } from '$lib/stores'
    import { onKeydown } from '$lib/utils'
    import { beforeNavigate } from '$app/navigation'
    import type { SupportedLocales } from '$shared/types'
    import { page } from '$app/stores'

    export let supportedLocales: SupportedLocales

    const toggleMenu = async () => {
        // @ts-expect-error This is an invalid value for scroll behavior, but it produces the result we want so... :D
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
        { href: '/roadmap', text: 'Roadmap' },
        { href: 'https://innerdevelopmentgoals.org', text: 'IDG website' },
        { href: 'https://idg.community/contribute', text: 'How to contribute' },
    ]
</script>

<header class="relative flex items-center justify-between pt-6 pb-12">
    <Link href="/" unstyled class="z-30 flex h-[60px] items-center gap-4">
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="112" height="60" />
        <div class="h-full w-px bg-black" />
        <span>Toolkit</span>
    </Link>

    <div class="z-30 md:hidden">
        <MenuButton isOpen={$isMenuOpen} onToggle={toggleMenu} />
    </div>

    {#if $isMenuOpen}
        <nav
            class="xs:text-4xl bg-lightGray fixed inset-0 z-20 flex h-full w-full flex-col items-center justify-center overflow-y-scroll text-3xl font-semibold"
            on:click={toggleMenu}
            on:keydown={onKeydown(toggleMenu)}
        >
            {#each links as { href, text }}
                <Link {href} class="p-4" variant="black">{text}</Link>
            {/each}
        </nav>
    {/if}

    <!-- NOTE: Breakpoints might be messed up by the negative margins that extend the actual width of the layout -->
    <!-- TODO: Ideally try to implement the layout without negative margins and offsets everywhere. -->
    <nav class="z-10 hidden md:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2 px-3 text-base" variant="black">{text}</Link>
        {/each}
        <!-- TODO: Only show locales for pages where it makes sense -->
        {#if $page?.route?.id?.includes('/framework')}
            <LocaleSwitcher {supportedLocales} />
        {/if}
    </nav>
</header>
