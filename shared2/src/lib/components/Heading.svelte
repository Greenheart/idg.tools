<script lang="ts" context="module">
    import { cx } from '../utils'

    const sizes = [1, 2, 3, 4, 5, 6] as const
    type Size = typeof sizes[number]

    const classes: Record<Size, string> = {
        1: 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold',
        2: 'md:text-3xl sm:text-2xl text-xl font-bold',
        3: 'text-lg font-bold',
        4: 'text-sm font-semibold',
        5: '',
        6: '',
    }
</script>

<script lang="ts">
    export let size: Size = 2
    let className = ''
    export { className as class }
    const tag = `h${size}`
</script>

<svelte:element this={tag} class={cx(classes[size], className)}>
    <slot />
</svelte:element>
