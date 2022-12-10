<script lang="ts" context="module">
    import { cx } from '../utils'

    export const variants = {
        primary: 'bg-stone-50 text-stone-900 border-transparent',
        inverted: 'bg-stone-900 text-stone-50 border-transparent',
        secondary: 'bg-transparent text-stone-50 border-stone-50',
        'secondary-inverted': 'border-stone-900 text-stone-900',
        danger: 'bg-red-700 text-stone-50 border-transparent',
        disabled: 'bg-stone-50 text-stone-900 opacity-60 pointer-events-none border-transparent',
        active: 'bg-purple-500 text-stone-50 border-transparent',
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
        'transform-gpu hover:scale-105 duration-100 font-semibold text-center border'
</script>

<script lang="ts">
    export let variant: keyof typeof variants = defaultVariant
    export let disabled: boolean = false
    export let size: keyof typeof sizes = defaultSize
    export let element: HTMLButtonElement | undefined = undefined
    let className = ''
    export { className as class }
</script>

<button
    bind:this={element}
    {...$$props}
    {disabled}
    class={cx(defaultClasses, variants[disabled ? 'disabled' : variant], sizes[size], className)}
    on:click|trusted
>
    <slot />
</button>
