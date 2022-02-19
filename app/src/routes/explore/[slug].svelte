<!-- https://kit.svelte.dev/docs/routing -->
<script lang="ts">
    import Tool from '$components/Tool.svelte'

    // TODO: show ui layout
    // TODO: show hard coded data with always 'inner-compass'
    // TODO: fetch dynamic tool data based on the `slug`
    // TODO: load a random tool based on the user's selected IDGs

    // TODO: replace temp hard coded value
    const slug = 'inner-compass'
</script>

<h1 class="pt-8 text-5xl tracking-wider md:pt-16">Today's focus</h1>

<Tool id={slug} />
