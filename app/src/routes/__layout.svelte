<script>
    import Header from '$components/Header.svelte'
    import { TAGLINE } from '$lib/constants'

    import '../app.css'
</script>

<svelte:head>
    <title>IDG.tools | {TAGLINE}</title>
</svelte:head>

<main class="mx-auto w-full max-w-lg px-5 pb-16 text-stone-50">
    <Header />
    <slot />
</main>
