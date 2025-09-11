<script lang="ts" module>
    import { onMount, type Snippet } from 'svelte'

    import { isExternalURL } from '../utils'
    import { variants, defaultVariant, defaultClasses, sizes, defaultSize } from './Button.svelte'
    import Link from './Link.svelte'
</script>

<script lang="ts">
    interface Props {
        variant?: keyof typeof variants
        size?: keyof typeof sizes
        disabled?: boolean
        class?: string
        href?: string
        children?: Snippet
    }

    let {
        variant = defaultVariant,
        size = defaultSize,
        disabled = false,
        class: className = '',
        href = '',
        children,
    }: Props = $props()
    let additionalProps: object = $state({})
    onMount(() => {
        if (isExternalURL(href)) {
            additionalProps = {
                rel: 'noopener noreferrer',
                target: '_blank',
                'data-sveltekit-reload': true,
            }
        }
    })
</script>

<Link
    {href}
    unstyled
    class={[
        defaultClasses,
        variants[disabled ? 'disabled' : variant],
        disabled ? 'pointer-events-none' : '',
        sizes[size],
        className,
    ]}
    {...additionalProps}
>
    {@render children?.()}
</Link>
