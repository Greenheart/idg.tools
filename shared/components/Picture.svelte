<script lang="ts">
    type ImageSource = Pick<HTMLSourceElement, 'srcset'> & {
        type: 'image/webp' | 'image/jpeg' | 'image/png'
    }

    type Props = {
        class?: string
        /**
         * Only used by `@humanspeak/svelte-markdown` to pass image src
         */
        href?: string | undefined
        src?: string
        sources?: ImageSource[]
        loading?: HTMLImageElement['loading']
        /*
         * Only used when by `svelte-markdown` to render alt fallback
         */
        text?: string | undefined
        alt?: string
        title?: string | undefined
        // NOTE: We might need to specify width and height when rendering images through `svelte-markdown`. Not sure.
        width: number | undefined
        height: number | undefined
    }

    let {
        class: className = '',
        href = undefined,
        src = href,
        sources = [],
        loading = 'eager',
        text = undefined,
        alt = text,
        title = undefined,
        width,
        height,
    }: Props = $props()

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
        class={['shadow-md', className]}
        alt={alt ?? text}
        {loading}
    />
</picture>
