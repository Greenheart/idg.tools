<script lang="ts">
    import { page } from '$app/stores'
    import Tool from '$components/Tool.svelte'
    import { getToolBySlug } from '$lib/idgs'

    // TODO: switch to static pre-rendering using sveltkit data loading
    // This would allow this route to be the initial page load for the app.
    const tool = getToolBySlug($page.params.slug)
</script>

<h1 class="pt-8 text-5xl tracking-wider md:pt-16">Today's focus</h1>

<Tool {tool} />
