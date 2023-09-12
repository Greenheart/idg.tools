<script lang="ts">
    import Link from '$shared/components/Link.svelte'
    import { IDG_WEBSITE } from '$shared/constants'

    import '../../app.css'
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-black sm:max-w-4xl sm:px-8 sm:text-lg">
    <header class="relative flex items-center justify-between pt-6 pb-12">
        <Link href={IDG_WEBSITE} unstyled class="z-30 flex h-[60px] items-center gap-4">
            <img src="/images/IDG-logo.svg" alt="IDG logo" width="112" height="60" />
        </Link>
    </header>
    <slot />
</main>
