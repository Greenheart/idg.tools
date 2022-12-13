<script lang="ts">
    import { cx } from '../utils'

    type ImageSource = Pick<HTMLSourceElement, 'srcset' | 'type'>

    let className = ''

    /**
     * Only used by `svelte-markdown` to pass image src
     */
    export let href: string | undefined = undefined

    export let src: string = href
    export let sources: ImageSource[] = []

    // Render fallback images even if `sources` are not exlpicitly defined.
    // This happens when images are rendered by `svelte-markdown` which can only handle one image by default.
    // NOTE: This also assumes the input `src` is always a `.webp` image so this might break with real usage.
    // Though, we could protect against this by adding a validation to the content build step.
    if (!sources.length) {
        sources.push({
            srcset: src.replace(/\.webp$/, '.jpg'),
            type: 'jpg',
        })
    }
    /*
     * Only used when by `svelte-markdown` to render alt fallback
     */
    export let text: string | undefined = undefined
    export let alt: string = text
    export let title: string | undefined = undefined
    // NOTE: We might need to specify width and height when rendering images through `svelte-markdown`. Not sure.
    export let width: number | undefined
    export let height: number | undefined
    export { className as class }
</script>

<picture>
    {#each sources as { srcset, type }}
        <source {srcset} {type} {width} {height} />
    {/each}
    <img {src} {width} {height} {title} class={cx('shadow-md', className)} alt={alt ?? text} />
</picture>
