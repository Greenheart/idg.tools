<script lang="ts">
    import { cx } from '$lib/utils'
    export let score: number
    const baseClasses = 'h-4 w-4 rounded-full border border-stone-50'
    // This results in 1-5 dots that should be filled dependency on the relevancy
    const numberOfDots = (Math.ceil(score / 20) * 20) / 20
</script>

<div class="flex gap-1">
    <div class={cx(baseClasses, numberOfDots >= 1 ? 'bg-stone-50' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 2 ? 'bg-stone-50' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 3 ? 'bg-stone-50' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 4 ? 'bg-stone-50' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 5 ? 'bg-stone-50' : '')} />
</div>
