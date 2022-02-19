<script>
    import Header from '$components/Header.svelte'

    import '../app.css'
</script>

<main class="mx-auto w-full max-w-lg px-5 text-stone-50">
    <Header />
    <slot />
</main>
