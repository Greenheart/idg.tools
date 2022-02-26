<script>
    import { COMMUNITY_LINK } from '$lib/constants'

    import Link from './Link.svelte'
</script>

<header class="flex items-center justify-between pt-8 pb-12">
    <Link href="/" class="group flex flex-col">
        <img src="/images/IDG-tools.svg" alt="IDG.tools logo" />
    </Link>

    <nav class="flex justify-evenly">
        <Link class="p-2 hover:underline" href="/explore">Explore</Link>
        <!-- IDEA: Add /community page to explain the various types of communities:
            - IDG community on Element
            - 29k
         -->
        <Link class="p-2 hover:underline" href={COMMUNITY_LINK}>Community</Link>
    </nav>
</header>
