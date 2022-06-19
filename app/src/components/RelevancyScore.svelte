<script lang="ts">
    import { cx } from '$lib/utils'
    export let relevancy: number
    const baseClasses = 'h-6 w-6 rounded-full border border-white'
</script>

<div class="flex gap-1">
    <div class={cx(baseClasses, relevancy >= 1 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, relevancy >= 2 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, relevancy >= 3 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, relevancy >= 4 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, relevancy >= 5 ? 'bg-white' : '')} />
</div>
