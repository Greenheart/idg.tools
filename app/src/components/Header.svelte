<script lang="ts">
    import { COMMUNITY_LINK } from '$lib/constants'

    import Link from './Link.svelte'

    let isMenuOpen = false

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen
    }
</script>

<header class="sticky top-0 flex items-center justify-between pt-6 pb-12">
    <Link href="/" class="group flex flex-col">
        <img src="/images/IDG-tools.svg" alt="IDG.tools logo" />
    </Link>

    <button
        class="hamburger hamburger--spring"
        class:is-active={isMenuOpen}
        type="button"
        on:click={toggleMenu}
    >
        <span class="hamburger-box">
            <span class="hamburger-inner" />
        </span>
    </button>

    <nav class="hidden justify-evenly md:flex">
        <Link class="p-2 hover:underline" href="/explore">Explore</Link>
        <!-- IDEA: Add /community page to explain the various types of communities:
            - IDG community on Element
            - 29k
         -->
        <Link class="p-2 hover:underline" href={COMMUNITY_LINK}>Community</Link>
    </nav>
</header>
