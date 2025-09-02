<script lang="ts" module>
    import { type Snippet } from 'svelte'
    import { cx } from '../utils'
    import type { HTMLButtonAttributes } from 'svelte/elements'

    export const variants = {
        primary: 'bg-white text-black hover:bg-lightGray shadow-xl',
        inverted: 'bg-black text-white hover:bg-opacity-75 shadow-lg',
        secondary: 'bg-black text-white border-black border hover:bg-opacity-80 shadow-lg',
        'secondary-inverted':
            'bg-white border-black text-black border hover:bg-lightGray shadow-xl',
        disabled: 'bg-white text-black opacity-60 pointer-events-none shadow-lg',
    }
    export const sizes = {
        lg: 'px-12 py-3 text-lg',
        md: 'px-4 py-2 text-base',
        sm: 'px-2 py-1 text-base',
    }

    export const defaultVariant = 'primary'
    export const defaultSize = 'lg'
    export const defaultClasses = 'transform-gpu duration-100 font-semibold text-center'
</script>

<script lang="ts">
    interface Props {
        variant?: keyof typeof variants
        disabled?: boolean
        size?: keyof typeof sizes
        element?: HTMLButtonElement | undefined
        tabindex?: HTMLButtonElement['tabIndex'] | undefined
        type?: 'submit' | undefined
        unstyled?: boolean
        class?: string
        // TODO: In order to properly resolve imports, make the shared components into a workspace package that can be used by all projects
        // Then we can have a svelte config here which makes the Svelte language tools work as expected
        onclick?: HTMLButtonAttributes['onclick']
        children?: Snippet
    }

    let {
        variant = defaultVariant,
        disabled = false,
        size = defaultSize,
        element = $bindable(undefined),
        tabindex = undefined,
        type = undefined,
        unstyled = false,
        class: className = '',
        onclick,
        children,
    }: Props = $props()

    let classes = $derived(
        unstyled
            ? [defaultClasses, sizes[size], className]
            : [defaultClasses, variants[disabled ? 'disabled' : variant], sizes[size], className],
    )
</script>

<button
    bind:this={element}
    {disabled}
    {tabindex}
    {type}
    class={classes}
    onclick={(event) => {
        if (event.isTrusted) {
            onclick?.()
        }
    }}
>
    {@render children?.()}
</button>
