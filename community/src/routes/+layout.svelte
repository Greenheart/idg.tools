<script lang="ts">
    import { onMount } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import { page } from '$app/stores'
    import Header from '$components/Header.svelte'
    import CommunitySection from '$components/CommunitySection.svelte'
    import StoriesSection from '$components/StoriesSection.svelte'

    import '../app.css'
    import { getScrollbarWidth } from '$shared/utils'
    import { scrollbarWidth } from '$lib/stores'

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

    onMount(() => {
        $scrollbarWidth = getScrollbarWidth()
    })
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-black sm:max-w-6xl sm:px-8 sm:text-lg">
    <Header />
    <slot />
    <div class="mx-auto max-w-2xl px-4 sm:max-w-3xl sm:px-8">
        {#if $page?.route?.id === '/'}
            <CommunitySection />
        {:else if $page?.route?.id === '/stories/[link]'}
            <StoriesSection />
        {/if}
    </div>
</main>
