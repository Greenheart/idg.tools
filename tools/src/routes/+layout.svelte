<script lang="ts">
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import Header from '$components/Header.svelte'
    import { TAGLINE } from '$lib/constants'
    import { page } from '$app/stores'
    import { getBgOpacity } from './+layout'
    import { isMenuOpen } from '$lib/stores'

    import '../app.css'
    import CommunitySection from '$components/CommunitySection.svelte'

    export const csr = false
    export const prerender = true

    $: bodyStyle = `
<style>
    body, .filters-backdrop {
        background: linear-gradient(0deg, #000, rgb(0 0 0 / ${getBgOpacity($page?.route?.id)}%));
    }
</style>
`

    // Workaround to allow smooth scrolling in Firefox
    // https://github.com/sveltejs/kit/issues/2733#issuecomment-1050779671
    beforeNavigate(({ to, from }) => {
        if (to?.route?.id !== from?.route?.id) {
            console.log('navigating away')
            document.documentElement.style.scrollBehavior = 'auto'
        }
    })
    afterNavigate(({ to, from }) => {
        if (to?.route?.id !== from?.route?.id) {
            document.documentElement.style.scrollBehavior = ''
        }
    })
</script>

<svelte:head>
    <title>IDG.tools | {TAGLINE}</title>

    {@html bodyStyle}
</svelte:head>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-stone-50 sm:max-w-6xl">
    <Header />
    <div class:hidden={$isMenuOpen}>
        <slot />
    </div>
</main>

<div class="mx-auto w-full max-w-2xl px-4 pb-16 sm:max-w-3xl" class:hidden={$isMenuOpen}>
    <CommunitySection />
</div>
