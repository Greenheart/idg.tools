<script lang="ts">
    import { cx } from '$lib/utils'

    const sizes = [1, 2, 3, 4, 5, 6] as const
    type Size = typeof sizes[number]

    export let size: Size = 2
    let className: string = ''
    export { className as class }
</script>

{#if size === 1}
    <h1 class={cx('text-6xl tracking-wider', className)}>
        <slot />
    </h1>
{:else if size === 2}
    <h2 class={cx('text-xl font-bold', className)}>
        <slot />
    </h2>
{/if}
