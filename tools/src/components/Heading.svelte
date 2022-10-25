<script lang="ts">
    import { cx } from '$lib/utils'

    const sizes = [1, 2, 3, 4, 5, 6] as const
    type Size = typeof sizes[number]

    export let size: Size = 2
    let className = ''
    export { className as class }
</script>

{#if size === 1}
    <h1
        class={cx(
            'text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold',
            className,
        )}
    >
        <slot />
    </h1>
{:else if size === 2}
    <h2 class={cx('md:text-3xl sm:text-2xl text-xl font-bold', className)}>
        <slot />
    </h2>
{:else if size === 3}
    <h3 class={cx('text-lg font-bold', className)}>
        <slot />
    </h3>
{:else if size === 4}
    <h4 class={cx('text-sm font-semibold', className)}>
        <slot />
    </h4>
{/if}
