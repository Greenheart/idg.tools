<script lang="ts">
    import { onMount, type Snippet } from 'svelte'
    import { afterNavigate, beforeNavigate } from '$app/navigation'

    import '../app.css'
    import { globalState } from '$lib/global-state.svelte'
    import { getScrollbarWidth } from '$shared/utils'
    interface Props {
        children?: Snippet
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

{@render children?.()}
