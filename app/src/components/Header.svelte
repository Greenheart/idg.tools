<script lang="ts">
    import Link from '$components/Link.svelte'

    import { isMenuOpen } from '$lib/stores'
    const toggleMenu = () => {
        $isMenuOpen = !$isMenuOpen
    }

    const links = [
        // { href: '/', text: 'Home' },
        // { href: '/about', text: 'About' },
        { href: 'https://github.com/Greenheart/idg.tools', text: 'GitHub' },
        // { href: COMMUNITY_LINK, text: 'Community' },
    ]
</script>

<header class="relative flex items-center justify-between pt-6 pb-12">
    <Link href="/" unstyled class="flex h-[60px] items-center">
        <img src="/images/IDG-tools.svg" alt="IDG.tools logo" class="mx-auto" />
    </Link>

    {#if $isMenuOpen}
        <nav
            class="fixed inset-0 flex h-full w-full flex-col items-center justify-center text-6xl font-semibold backdrop-blur-2xl"
            on:click={toggleMenu}
            on:keypress={toggleMenu}
        >
            {#each links as { href, text }}
                <Link {href} class="p-4">{text}</Link>
            {/each}
        </nav>
    {/if}

    <button
        class="hamburger hamburger--spring z-10 !-mr-4 justify-evenly sm:hidden"
        class:is-active={$isMenuOpen}
        type="button"
        on:click={toggleMenu}
    >
        <span class="hamburger-box">
            <span class="hamburger-inner" />
        </span>
    </button>

    <nav class="z-10 hidden justify-evenly sm:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2">{text}</Link>
        {/each}
    </nav>
</header>
