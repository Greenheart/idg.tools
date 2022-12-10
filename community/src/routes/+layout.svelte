<script lang="ts">
    import Header from '$components/Header.svelte'
    import CommunitySection from '$components/CommunitySection.svelte'
    import StoriesSection from '$components/StoriesSection.svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import { page } from '$app/stores'
    import { isMenuOpen } from '$lib/stores'

    import '../app.css'

    export const csr = false
    export const prerender = true

    // Workaround to allow smooth scrolling in Firefox
    // https://github.com/sveltejs/kit/issues/2733#issuecomment-1050779671
    beforeNavigate(({ to, from }) => {
        if (to?.url?.pathname !== from?.url?.pathname) {
            document.documentElement.style.scrollBehavior = 'auto'
        }
    })
    afterNavigate(() => (document.documentElement.style.scrollBehavior = ''))
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-stone-50 sm:max-w-6xl sm:text-lg">
    <Header />
    <div class:hidden={$isMenuOpen}>
        <slot />
    </div>
</main>

<div class="mx-auto w-full max-w-2xl px-4 pb-16 sm:max-w-3xl" class:hidden={$isMenuOpen}>
    {#if $page?.route?.id === '/'}
        <CommunitySection />
    {:else if $page?.route?.id === '/stories/[link]'}
        <StoriesSection />
    {/if}
</div>
