<script lang="ts">
    import { Link, MenuButton } from '$shared/components'
    import { globalState } from '$lib/global-state.svelte'
    import { onKeydown } from '$lib/utils'
    import { beforeNavigate } from '$app/navigation'
    import { tick } from 'svelte'
    import { IDG_WEBSITE } from '$shared/constants'

    const toggleMenu = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        globalState.isMenuOpen = !globalState.isMenuOpen
        document.documentElement.classList.toggle('overflow-y-scroll', !globalState.isMenuOpen)
        document.documentElement.classList.toggle('overflow-hidden', globalState.isMenuOpen)
        document.documentElement.style.paddingRight = globalState.isMenuOpen
            ? `${globalState.scrollbarWidth}px`
            : ''
    }

    beforeNavigate(async () => {
        if (globalState.isMenuOpen) {
            toggleMenu()
            await tick()
        }
    })

    const links = [
        { href: 'https://idg.tools', text: 'Toolkit' },
        { href: IDG_WEBSITE, text: 'IDG website' },
    ]
</script>

<header class="relative flex items-center justify-between pb-12 pt-6">
    <Link href="/" unstyled class="z-30 flex h-[60px] items-center gap-4">
        <img src="/images/IDG-logo.svg" alt="IDG logo" width="112" height="60" />
        <div class="h-full w-px bg-black"></div>
        <span>Community</span>
    </Link>

    <div class="z-30 -mr-4 sm:hidden">
        <MenuButton isOpen={globalState.isMenuOpen} onToggle={toggleMenu} />
    </div>

    {#if globalState.isMenuOpen}
        <button
            class="xs:text-4xl bg-light-gray fixed inset-0 z-20 flex h-full w-full flex-col items-center justify-center text-3xl font-semibold"
            onclick={toggleMenu}
            onkeydown={onKeydown(toggleMenu)}
        >
            {#each links as { href, text }}
                <Link {href} class="p-4" variant="black">{text}</Link>
            {/each}
        </button>
    {/if}

    <nav class="z-10 hidden justify-evenly sm:flex">
        {#each links as { href, text }}
            <Link {href} class="p-2 text-base md:px-3" variant="black">{text}</Link>
        {/each}
    </nav>
</header>
