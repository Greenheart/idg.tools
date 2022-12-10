<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags'
    import type { OpenGraphImages } from 'svelte-meta-tags/types'
    import {
        BASE_URL,
        DEFAULT_DESCRIPTION,
        DEFAULT_OG_IMAGE,
        DEFAULT_OG_IMAGE_SQUARE,
        TAGLINE,
    } from '$lib/constants'

    export let title: string | undefined = ''
    const formattedTitle = title ? `${title} | ${TAGLINE}` : `${TAGLINE}`
    export let description: string | undefined = DEFAULT_DESCRIPTION
    export let url: string | undefined = BASE_URL
    export let images: OpenGraphImages[] = [
        {
            url: DEFAULT_OG_IMAGE,
            width: 1200,
            height: 736,
        },
        {
            url: DEFAULT_OG_IMAGE_SQUARE,
            width: 1000,
            height: 1000,
        },
    ]
</script>

<MetaTags
    title={formattedTitle}
    {description}
    canonical={url}
    openGraph={{
        url,
        title: formattedTitle,
        description,
        images,
    }}
/>
