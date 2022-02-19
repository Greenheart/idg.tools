<!-- https://kit.svelte.dev/docs/routing -->
<script lang="ts">
    import { page } from '$app/stores'
    import Tool from '$components/Tool.svelte'
    import { getToolBySlug } from '$lib/idgs'

    const tool = getToolBySlug($page.params.slug)
</script>

<h1 class="pt-8 text-5xl tracking-wider md:pt-16">Today's focus</h1>

<Tool {tool} />
