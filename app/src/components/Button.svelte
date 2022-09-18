<script lang="ts" context="module">
    import { cx } from '$lib/utils'

    export const variants = {
        primary: 'bg-stone-50 text-stone-900',
        inverted: 'bg-stone-900 text-stone-50',
        secondary: 'bg-transparent text-stone-50 border-stone-50 border',
        danger: 'bg-red-700 text-stone-50',
        disabled: 'bg-stone-50 text-stone-900 opacity-60 pointer-events-none',
        active: 'bg-purple-500 text-stone-50',
        unstyled: '',
    }
    export const sizes = {
        lg: 'px-12 py-3 text-lg',
        md: 'px-4 py-2 text-base',
        sm: 'px-2 py-1 text-base',
    }

    export const defaultVariant = 'primary'
    export const defaultSize = 'lg'
    export const defaultClasses =
        'transform-gpu hover:scale-105 duration-100 font-semibold rounded-full text-center'
</script>

<script lang="ts">
    export let variant: keyof typeof variants = defaultVariant
    export let disabled: boolean = false
    export let size: keyof typeof sizes = defaultSize
</script>

<button
    {...$$props}
    {disabled}
    class={cx(
        defaultClasses,
        variants[disabled ? 'disabled' : variant ?? defaultVariant],
        sizes[size ?? defaultSize],
        $$props.class ?? '',
    )}
    on:click
>
    <slot />
</button>
