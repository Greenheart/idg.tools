<script lang="ts">
    import type { Tool } from '$lib/idgs'

    export let tool: Tool
</script>

<h2 class="py-4 text-xl font-semibold">{tool.name}</h2>

<p class="pt-4">{tool.description}</p>

<div class="my-8 rounded-2xl bg-white p-4 text-stone-900">
    <h3 class="pb-2 text-xl font-bold">Your challenge</h3>
    <p>{tool.challenge}</p>
</div>

<h3 class="pb-2 text-xl font-bold">Want to learn more?</h3>
<p>{tool.resource}</p>
