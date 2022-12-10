<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import MenuButton from '$shared/components/MenuButton.svelte'
    import { isMenuOpen } from '$lib/stores'
    import { onKeydown } from '$lib/utils'
    import { beforeNavigate } from '$app/navigation'
    import { tick } from 'svelte'

    const toggleMenu = () => {
        $isMenuOpen = !$isMenuOpen
    }

    beforeNavigate(async () => {
        if ($isMenuOpen) {
            $isMenuOpen = false
            await tick()
        }
    })

    const links = [
        // { href: '/about', text: 'About' },
        { href: 'https://idg.community/contribute', text: 'How to contribute' },
        // { href: ELEMENT_LINK, text: 'Community' },
    ]
</script>

<header class="relative flex items-center justify-between pt-6 pb-12">
    <Link href="/" unstyled class="z-30 flex h-[60px] items-center gap-4">
        <img src="/images/IDG-logo.svg" alt="IDG logo" class="h-[60px]" />
        <div class="h-full w-px bg-white" />
        <span>Toolkit</span>
    </Link>

    {#if $isMenuOpen}
        <nav
            class="fixed inset-0 z-20 flex h-full w-full flex-col items-center justify-center bg-black text-6xl font-semibold"
            on:click={toggleMenu}
            on:keydown={onKeydown(toggleMenu)}
        >
            {#each links as { href, text }}
                <Link {href} class="p-4">{text}</Link>
            {/each}
        </nav>
    {/if}

    <div class="z-20 !-mr-4 sm:hidden">
        <MenuButton isOpen={$isMenuOpen} onToggle={toggleMenu} />
    </div>

    <nav class="z-10 hidden justify-evenly sm:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2">{text}</Link>
        {/each}
    </nav>
</header>
