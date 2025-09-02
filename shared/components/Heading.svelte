<script lang="ts" module>
    import { type Snippet } from 'svelte'

    const sizes = [1, 2, 3, 4, 5, 6] as const
    type Size = (typeof sizes)[number]

    const classes: Record<Size, string> = {
        1: 'text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold',
        2: 'text-2xl md:text-3xl font-bold',
        3: 'text-lg sm:text-xl font-bold',
        4: 'text-sm font-semibold',
        5: '',
        6: '',
    }
</script>

<script lang="ts">
    interface Props {
        size?: Size
        class?: string
        id?: string | undefined
        tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        children?: Snippet
    }

    let {
        size = 2,
        class: className = '',
        id = undefined,
        tag = `h${size}`,
        children,
    }: Props = $props()
</script>

<svelte:element this={tag} class={[classes[size], className]} {id}>
    {@render children?.()}
</svelte:element>
