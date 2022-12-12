<script lang="ts">
    import { cx } from '../utils'
    let className = ''
    export { className as class }
</script>

<div
    class={cx(
        'xs:grid-cols-2 xs:max-w-max grid gap-y-2 gap-x-4 whitespace-nowrap sm:place-content-start',
        className,
    )}
>
    <slot />
</div>
