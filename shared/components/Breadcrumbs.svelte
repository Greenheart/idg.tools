<script lang="ts" context="module">
    import Arrow from '../icons/Arrow.svelte'
    import Link from './Link.svelte'

    type Breadcrumb = {
        text: string
        link?: string
    }
</script>

<script lang="ts">
    export let sections: Breadcrumb[] = []
</script>

<div class="flex items-center gap-2">
    {#each sections as { text, link }, i}
        {#if link}
            <Link href={link} variant="black">{text}</Link>
        {:else}
            <span>{text}</span>
        {/if}
        {#if i < sections.length - 1}<Arrow right />{/if}
    {/each}
</div>
