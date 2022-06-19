<script lang="ts">
    import { cx } from '$lib/utils'
    export let score: number
    const baseClasses = 'h-6 w-6 rounded-full border border-white'
    // This results in 1-5 dots that should be filled dependency on the relevancy
    const numberOfDots = (Math.ceil(score / 20) * 20) / 20
</script>

<div class="flex gap-1">
    <div class={cx(baseClasses, numberOfDots >= 1 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 2 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 3 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 4 ? 'bg-white' : '')} />
    <div class={cx(baseClasses, numberOfDots >= 5 ? 'bg-white' : '')} />
</div>
