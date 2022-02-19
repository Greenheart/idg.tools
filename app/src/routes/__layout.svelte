<script>
    import Header from '$components/Header.svelte'

    import '../app.css'
</script>

<main class="mx-auto w-full max-w-lg px-5 pb-16 text-stone-50">
    <Header />
    <slot />
</main>
