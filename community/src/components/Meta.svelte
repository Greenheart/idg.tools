<script lang="ts">
    import { MetaTags } from 'svelte-meta-tags'
    import type { OpenGraph } from 'svelte-meta-tags'
    import {
        BASE_URL,
        DEFAULT_DESCRIPTION,
        DEFAULT_OG_IMAGE,
        DEFAULT_OG_IMAGE_SQUARE,
        TAGLINE,
    } from '$lib/constants'

    interface Props {
        title?: string | undefined
        description?: string | undefined
        url?: string | undefined
        images?: OpenGraph['images']
    }

    let {
        title = '',
        description = DEFAULT_DESCRIPTION,
        url = BASE_URL,
        images = [
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
        ],
    }: Props = $props()

    const formattedTitle = title ? `${title} | ${TAGLINE}` : `${TAGLINE}`
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
