<script>
    import Link from './Link.svelte'
</script>

<header class="flex items-center justify-between py-8">
    <Link href="/" class="group flex flex-col">
        <span class="font-bold group-hover:underline">IDG.tools</span>
        <span class="text-sm">Inner Development Toolbox</span>
    </Link>

    <nav class="flex justify-evenly">
        <Link class="p-2 hover:underline" href="/explore">Explore</Link>
        <Link
            class="p-2 hover:underline"
            href="https://matrix.to/#/#idg:matrix.org"
        >
            Community
        </Link>
    </nav>
</header>
