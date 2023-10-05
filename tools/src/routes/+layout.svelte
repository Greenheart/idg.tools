<script lang="ts">
    import { onMount } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'

    import '../app.css'
    import { scrollbarWidth } from '$lib/stores'
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

<slot />
