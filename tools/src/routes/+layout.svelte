<script lang="ts">
    import { onMount } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import Header from '$components/Header.svelte'

    import '../app.css'
    import { scrollbarWidth } from '$lib/stores'
    import CommunitySection from '$components/CommunitySection.svelte'
    import Link from '$shared/components/Link.svelte'
    import { GITHUB_LINK } from '$shared/constants'
    import { getScrollbarWidth } from '$shared/utils'

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

    onMount(() => {
        $scrollbarWidth = getScrollbarWidth()
    })
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-stone-50 sm:max-w-6xl sm:px-8 sm:text-lg">
    <Header />
    <slot />
    <div class="mx-auto mt-16 max-w-2xl px-4 sm:max-w-3xl sm:px-8">
        <CommunitySection />
        <p class="mt-16 text-center">
            IDG.tools uses two licenses: CC-BY-SA-4.0 for content (except images), and AGPL-3.0 for
            software.
            <Link href={GITHUB_LINK} variant="pink" class="whitespace-nowrap"
                >Learn more on GitHub</Link
            >
        </p>
    </div>
</main>
