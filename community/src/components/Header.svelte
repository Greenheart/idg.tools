<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import MenuButton from '$shared/components/MenuButton.svelte'
    import { isMenuOpen, scrollbarWidth } from '$lib/stores'
    import { onKeydown } from '$lib/utils'
    import { beforeNavigate } from '$app/navigation'
    import { tick } from 'svelte'

    const toggleMenu = () => {
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
        { href: 'https://idg.tools', text: 'Toolkit' },
        { href: 'https://innerdevelopmentgoals.org', text: 'IDG website' },
        { href: '/contribute', text: 'How to contribute' },
    ]
</script>

<header class="relative flex items-center justify-between pt-6 pb-12">
    <Link href="/" unstyled class="z-30 flex h-[60px] items-center gap-4">
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="112" height="60" />
        <div class="h-full w-px bg-black" />
        <span>Community</span>
    </Link>

    <div class="z-30 -mr-4 sm:hidden">
        <MenuButton isOpen={$isMenuOpen} onToggle={toggleMenu} />
    </div>

    {#if $isMenuOpen}
        <nav
            class="xs:text-4xl bg-lightGray fixed inset-0 z-20 flex h-full w-full flex-col items-center justify-center text-3xl font-semibold"
            on:click={toggleMenu}
            on:keydown={onKeydown(toggleMenu)}
        >
            {#each links as { href, text }}
                <Link {href} class="p-4" variant="black">{text}</Link>
            {/each}
        </nav>
    {/if}

    <nav class="z-10 hidden justify-evenly sm:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2 text-base md:px-4" variant="black">{text}</Link>
        {/each}
    </nav>
</header>
