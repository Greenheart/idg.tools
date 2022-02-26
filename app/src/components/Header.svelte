<script lang="ts">
    import { COMMUNITY_LINK } from '$lib/constants'
    import { isMenuOpen } from '$lib/stores'

    import Link from './Link.svelte'

    const toggleMenu = () => {
        $isMenuOpen = !$isMenuOpen
    }

    const links = [
        { href: '/skills', text: 'Skills' },
        { href: '/explore', text: 'Toolbox' },
        { href: COMMUNITY_LINK, text: 'Community' },
    ]
</script>

<header class="flex items-center justify-between pt-6 pb-12">
    <Link href="/" class="flex h-[60px] items-center">
        <img src="/images/IDG-tools.svg" alt="IDG.tools logo" />
    </Link>

    {#if $isMenuOpen}
        <nav
            class="fixed top-0 bottom-0 left-0 right-0 flex h-full w-full flex-col items-center justify-center text-6xl font-semibold backdrop-blur-2xl"
            on:click={toggleMenu}
        >
            {#each links as { href, text }}
                <Link {href} class="p-2">{text}</Link>
            {/each}
        </nav>
    {/if}

    <button
        class="hamburger hamburger--spring justify-evenly sm:hidden"
        class:is-active={$isMenuOpen}
        type="button"
        on:click={toggleMenu}
    >
        <span class="hamburger-box">
            <span class="hamburger-inner" />
        </span>
    </button>

    <nav class="hidden justify-evenly sm:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2">{text}</Link>
        {/each}
        <!-- IDEA: Add /community page to explain the various types of communities:
            - IDG community on Element
            - 29k
         -->
    </nav>
</header>
