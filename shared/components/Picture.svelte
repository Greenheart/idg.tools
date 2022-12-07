<script lang="ts">
    type ImageSource = Pick<HTMLSourceElement, 'srcset' | 'type'>

    let className = ''
    export let sources: ImageSource[] = []
    export let src: string
    export let alt: string
    export let width: number
    export let height: number
    export { className as class }
</script>

<picture>
    {#each sources as { srcset, type }}
        <source {srcset} {type} {width} {height} />
    {/each}
    <img {src} {width} {height} class={className} {alt} />
</picture>
