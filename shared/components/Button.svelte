<script lang="ts" context="module">
    import { cx } from '../utils'

    export const variants = {
        primary: 'bg-stone-50 text-stone-900 hover:bg-stone-300',
        inverted: 'bg-stone-900 text-stone-50 hover:bg-stone-700',
        secondary: 'bg-black text-stone-50 border-stone-50 border hover:bg-stone-900',
        'secondary-inverted':
            'bg-stone-50 border-stone-900 text-stone-900 border hover:bg-stone-200',
        disabled: 'bg-stone-50 text-stone-900 opacity-60 pointer-events-none',
        unstyled: '',
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
    export let variant: keyof typeof variants = defaultVariant
    export let disabled: boolean = false
    export let size: keyof typeof sizes = defaultSize
    export let element: HTMLButtonElement | undefined = undefined
    export let tabindex: HTMLButtonElement['tabIndex'] | undefined = undefined
    let className = ''
    export { className as class }
</script>

<button
    bind:this={element}
    {disabled}
    {tabindex}
    class={cx(defaultClasses, variants[disabled ? 'disabled' : variant], sizes[size], className)}
    on:click|trusted
>
    <slot />
</button>
