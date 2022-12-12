<script lang="ts" context="module">
    import { cx } from '../utils'

    export const variants = {
        primary: 'bg-white text-black hover:bg-lightGray shadow-xl',
        inverted: 'bg-black text-white hover:bg-opacity-75 shadow-lg',
        secondary: 'bg-black text-white border-black border hover:bg-opacity-80 shadow-lg',
        'secondary-inverted':
            'bg-white border-black text-black border hover:bg-lightGray shadow-xl',
        disabled: 'bg-white text-black opacity-60 pointer-events-none shadow-lg',
        // TODO: Maybe replace the variant="unstyled" syntax with an `unstyled` boolean prop like for links
        // This could give cleaner code, and make it consistent with other components
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
    export let type: HTMLButtonElement['type'] | undefined = undefined
    let className = ''
    export { className as class }
</script>

<button
    bind:this={element}
    {disabled}
    {tabindex}
    {type}
    class={cx(defaultClasses, variants[disabled ? 'disabled' : variant], sizes[size], className)}
    on:click|trusted
>
    <slot />
</button>
