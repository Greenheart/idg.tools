<script lang="ts" context="module">
    const getBgOpacity = (routeId: string) => {
        if (routeId === 'explore/[link]') return 75
        if (routeId === 'explore') return 65
        return 55
    }
</script>

<script lang="ts">
    import Header from '$components/Header.svelte'
    import { TAGLINE } from '$lib/constants'
    import { isMenuOpen } from '$lib/stores'
    import { page } from '$app/stores'

    import '../app.css'

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

<main class="mx-auto w-full max-w-lg px-5 pb-16 text-stone-50">
    <Header showBackButton={$page.url.pathname !== '/'} />
    <div class:hidden={$isMenuOpen}>
        <slot />
    </div>
</main>
