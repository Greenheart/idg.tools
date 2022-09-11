<script lang="ts">
    import Header from '$components/Header.svelte'
    import { TAGLINE } from '$lib/constants'
    import { isMenuOpen } from '$lib/stores'
    import { page } from '$app/stores'
    import { getBgOpacity } from './+layout'

    import '../app.css'
    import CommunitySection from '$components/CommunitySection.svelte'

    export const csr = false
    export const prerender = true

    $: bodyStyle = `
<style>
    body {
        background: linear-gradient(0deg, #000, rgb(0 0 0 / ${getBgOpacity(
            $page.routeId,
        )}%));
    }
</style>
`
</script>

<svelte:head>
    <title>IDG.tools | {TAGLINE}</title>

    {@html bodyStyle}
</svelte:head>

<main class="mx-auto w-full max-w-lg px-5 pb-16 text-stone-50 sm:max-w-5xl">
    <Header />
    <div class:hidden={$isMenuOpen}>
        <slot />
    </div>
</main>

<div class="mx-auto w-full max-w-lg px-5 pb-16 sm:max-w-3xl">
    <CommunitySection />
</div>
