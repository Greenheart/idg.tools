<script lang="ts" context="module">
    import { cx } from '$lib/utils'

    export const variants = {
        primary: 'bg-stone-50 text-stone-900',
        secondary: 'bg-transparent text-stone-50 border-stone-50',
        danger: 'bg-red-700 text-stone-50',
        inactive: 'bg-stone-50 text-stone-900 opacity-60',
    }
    export const defaultVariant = 'primary'

    export const defaultButtonClasses =
        'px-12 py-4 transform-gpu hover:scale-105 duration-100 text-xl font-semibold rounded-2xl text-center'

    export type ButtonProps = {
        onClick: () => void
        label: string
        variant: keyof typeof variants
        autofocus?: boolean
    }
</script>

<script lang="ts">
    export let variant: ButtonProps['variant'] = defaultVariant
    export let onClick: ButtonProps['onClick']
    export let label: ButtonProps['label']
    export let autofocus: ButtonProps['autofocus'] = false
</script>

<!-- svelte-ignore a11y-autofocus -->
<button
    {autofocus}
    class={cx(
        defaultButtonClasses,
        variants[variant ?? defaultVariant],
        $$props.class ?? '',
    )}
    on:click={onClick}
>
    {label}
</button>
