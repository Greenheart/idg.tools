<script lang="ts">
    interface Props {
        score: number
    }

    let { score }: Props = $props()
    const baseClasses = 'h-4 w-4 rounded-full border border-black'
    // This results in 1-5 dots that should be filled dependency on the relevancy
    const numberOfDots = (Math.ceil(score / 20) * 20) / 20
</script>

<div class="flex gap-1" aria-label="Relevancy: {numberOfDots} of 5">
    <div class={[baseClasses, numberOfDots >= 1 ? 'bg-black' : '']}></div>
    <div class={[baseClasses, numberOfDots >= 2 ? 'bg-black' : '']}></div>
    <div class={[baseClasses, numberOfDots >= 3 ? 'bg-black' : '']}></div>
    <div class={[baseClasses, numberOfDots >= 4 ? 'bg-black' : '']}></div>
    <div class={[baseClasses, numberOfDots >= 5 ? 'bg-black' : '']}></div>
</div>
