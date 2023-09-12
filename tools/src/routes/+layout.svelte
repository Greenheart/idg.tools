<script lang="ts">
    import { onMount } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import Header from '$components/Header.svelte'

    import '../app.css'
    import { scrollbarWidth } from '$lib/stores'
    import CommunitySection from '$components/CommunitySection.svelte'
    import { Link } from '$shared/components'
    import { GITHUB_LINK } from '$shared/constants'
    import { getScrollbarWidth } from '$shared/utils'

    // Workaround to allow smooth scrolling in Firefox
    // https://github.com/sveltejs/kit/issues/2733#issuecomment-1050779671
    // TODO: Check if SvelteKit snapshots can solve this: https://github.com/sveltejs/kit/pull/8723#issuecomment-1423522635
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

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-black sm:max-w-6xl sm:px-8 sm:text-lg">
    <Header />
    <slot />
    <div class="mx-auto mt-16 max-w-2xl sm:max-w-3xl">
        <CommunitySection />
        <p class="mt-16 text-center">
            The IDG Toolkit uses two licenses: CC-BY-SA-4.0 for content (except images), and
            AGPL-3.0 for software.
            <Link href={GITHUB_LINK} variant="orange" class="whitespace-nowrap"
                >Learn more on GitHub</Link
            >
        </p>
    </div>
</main>
