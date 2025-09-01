<script lang="ts">
    import { cx } from '../utils'

    const breakpoints = {
        xs: 'xs:grid-cols-2 xs:max-w-max sm:place-content-start',
        sm: 'sm:grid-cols-2 sm:max-w-max sm:place-content-start',
    }

    export let breakpoint: keyof typeof breakpoints = 'xs'
    let className = ''
    export { className as class }
</script>

<div class={cx('grid gap-x-4 gap-y-2 whitespace-nowrap', breakpoints[breakpoint], className)}>
    <slot />
</div>
