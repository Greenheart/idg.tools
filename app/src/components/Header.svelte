<script>
    import Link from './Link.svelte'
</script>

<header class="flex items-center justify-between py-8">
    <Link href="/" class="group flex flex-col">
        <span class="font-bold group-hover:underline">IDG.tools</span>
        <span class="text-sm">Your inner development toolbox</span>
    </Link>

    <nav class="flex justify-evenly">
        <!-- TODO: make header responsive -->
        <Link class="p-2 hover:underline" href="/explore">Explore</Link>
        <!-- IDEA: Add /community page to explain the various types of communities:
            - IDG community on Element
            - 29k
         -->
        <Link
            class="p-2 hover:underline"
            href="https://matrix.to/#/#idg:matrix.org"
        >
            Community
        </Link>
    </nav>
</header>
