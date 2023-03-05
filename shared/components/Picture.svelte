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

    // Render fallback images even if `sources` are not explicitly defined.
    // This happens when images are rendered by `svelte-markdown` which can only handle one image by default.
    if (!sources.length) {
        sources.push({
            srcset: src.replace(/\.jpg$/, '.webp'),
            type: 'image/webp',
        })
    }

    // Always fallback to a well-supported format
    const fallbackSrc = src.replace(/\.webp$/, '.jpg')

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
    <img
        src={fallbackSrc}
        {width}
        {height}
        {title}
        class={cx('shadow-md', className)}
        alt={alt ?? text}
    />
</picture>
