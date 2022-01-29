<script lang="ts" context="module">
    const variants = {
        primary: 'bg-emerald-500 text-white',
        secondary: 'bg-stone-400 text-black',
        danger: 'bg-red-700 text-white',
    }
    const defaultVariant = 'primary'

    export type ButtonProps = {
        onClick: () => void
        label: string
        variant?: keyof typeof variants
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
    class={'px-12 py-4 transform-gpu hover:scale-105 duration-100 text-xl font-semibold ' +
        variants[variant ?? defaultVariant]}
    on:click={onClick}
>
    {label}
</button>
