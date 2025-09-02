<script lang="ts">
    import { onMount } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'
    import Header from '$components/Header.svelte'
    import StoriesSection from '$components/StoriesSection.svelte'

    import { getScrollbarWidth } from '$shared/utils'
    import { globalState } from '$lib/global-state.svelte'
    interface Props {
        children?: import('svelte').Snippet
    }

    let { children }: Props = $props()

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
        globalState.scrollbarWidth = getScrollbarWidth()
    })
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-black sm:max-w-6xl sm:px-8 sm:text-lg">
    <Header />
    {@render children?.()}
    <StoriesSection />
</main>
