<script lang="ts">
    import Arrow from '$components/icons/Arrow.svelte'
    import Link from '$components/Link.svelte'

    import { isMenuOpen } from '$lib/stores'
    import { page } from '$app/stores'

    export let showBackButton = false
    const toggleMenu = () => {
        $isMenuOpen = !$isMenuOpen
    }

    const getBackLink = (routeId: string) => {
        const backLinks = {
            'explore/[link]': '/explore',
            explore: '/',
        }
        return backLinks[routeId as keyof typeof backLinks] ?? '/'
    }

    const links = [
        { href: '/explore', text: 'Field Kit' },
        { href: 'https://github.com/Greenheart/idg.tools', text: 'GitHub' },
        // { href: COMMUNITY_LINK, text: 'Community' },
    ]
</script>

<header class="relative flex items-center justify-between pt-6 pb-12">
    {#if showBackButton && !$isMenuOpen}
        <Link
            href={getBackLink($page.routeId ?? '')}
            unstyled
            class="z-10 -ml-4 grid h-[60px] rotate-180 place-items-center p-4"
        >
            <Arrow class="h-8 w-8 pb-1" />
        </Link>

        <div class="absolute left-0 right-0 z-0 h-[60px]">
            <div class="flex h-full">
                <Link
                    href="/"
                    unstyled
                    class="mx-auto flex h-full items-center"
                >
                    <img
                        src="/images/IDG-tools.svg"
                        alt="IDG.tools logo"
                        class="mx-auto"
                    />
                </Link>
            </div>
        </div>
    {:else}
        <Link href="/" unstyled class="flex h-[60px] items-center">
            <img
                src="/images/IDG-tools.svg"
                alt="IDG.tools logo"
                class="mx-auto"
            />
        </Link>
    {/if}

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
