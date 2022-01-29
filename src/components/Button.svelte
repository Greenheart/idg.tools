<script lang="ts" context="module">
    import { cx } from '$lib/utils'

    export const variants = {
        primary: 'bg-stone-50 text-stone-900',
        secondary: 'bg-transparent text-stone-50 border-stone-50',
        danger: 'bg-red-700 text-stone-50',
        disabled: 'bg-stone-50 text-stone-900 opacity-60 pointer-events-none',
    }
    export const defaultVariant = 'primary'

    // IDEA: Add standard button sizes controlled by props

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
    export let disabled: boolean = false
</script>

<!-- svelte-ignore a11y-autofocus -->
<button
    {autofocus}
    {disabled}
    class={cx(
        defaultButtonClasses,
        variants[disabled ? 'disabled' : variant ?? defaultVariant],
        $$props.class ?? '',
    )}
    on:click={onClick}
>
    {label}
</button>
