<script lang="ts">
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import Header from '$components/Header.svelte'

    import '../app.css'
    import CommunitySection from '$components/CommunitySection.svelte'
    import Link from '$shared/components/Link.svelte'
    import { GITHUB_LINK } from '$shared/constants'

    export const csr = false
    export const prerender = true

    // Workaround to allow smooth scrolling in Firefox
    // https://github.com/sveltejs/kit/issues/2733#issuecomment-1050779671
    beforeNavigate(({ to, from }) => {
        if (to?.url?.pathname !== from?.url?.pathname) {
            document.documentElement.style.scrollBehavior = 'auto'
        }
    })
    afterNavigate(() => (document.documentElement.style.scrollBehavior = ''))
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-stone-50 sm:max-w-6xl sm:text-lg">
    <Header />
    <slot />
</main>

<div class="mx-auto w-full max-w-2xl px-4 pb-16 sm:max-w-3xl">
    <CommunitySection />
</div>

<div class="mx-auto w-full max-w-2xl px-12 pb-16 text-stone-50 sm:max-w-3xl">
    <p class="text-stone-50">
        IDG.tools uses two licenses: the CC-BY-SA-4.0 license for content (except images), and the
        AGPL-3.0 license for the software.
        <Link href={GITHUB_LINK} variant="pink">Learn more on GitHub</Link>
    </p>
</div>
