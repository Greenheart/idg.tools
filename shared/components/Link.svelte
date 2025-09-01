<script lang="ts" module>
    import { onMount } from 'svelte'

    import { cx, isExternalURL } from '../utils'

    export const variants = {
        orange: 'text-collaborating',
        white: 'text-white',
        black: 'text-black',
    }

    const defaultVariant = 'white'
    const defaultClasses = 'underline font-semibold'
</script>

<script lang="ts">
    import { createBubbler } from 'svelte/legacy'

    const bubble = createBubbler()

    interface Props {
        href?: string
        class?: string
        variant?: keyof typeof variants
        unstyled?: boolean
        tabindex?: number | undefined
        title?: string | undefined
        /**
         * Disable scrolling on navigation. This only makes sense for internal links.
         */
        noScroll?: boolean
        children?: import('svelte').Snippet
    }

    let {
        href = '',
        class: className = '',
        variant = defaultVariant,
        unstyled = false,
        tabindex = undefined,
        title = undefined,
        noScroll = false,
        children,
    }: Props = $props()

    let additionalProps: object = $state()
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = {
                rel: 'noopener noreferrer',
                target: '_blank',
                'data-sveltekit-reload': true,
            }
        } else if (noScroll) {
            additionalProps = {
                'data-sveltekit-noscroll': true,
            }
        }
    })

    let classes = $derived(unstyled ? className : cx(defaultClasses, variants[variant], className))
</script>

<a {href} {tabindex} {title} class={classes} {...additionalProps} onclick={bubble('click')}>
    {@render children?.()}
</a>
