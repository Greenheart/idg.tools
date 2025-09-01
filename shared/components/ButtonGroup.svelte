<script lang="ts">
    import { cx } from '../utils'

    const breakpoints = {
        xs: 'xs:grid-cols-2 xs:max-w-max sm:place-content-start',
        sm: 'sm:grid-cols-2 sm:max-w-max sm:place-content-start',
    }

    interface Props {
        breakpoint?: keyof typeof breakpoints
        class?: string
        children?: import('svelte').Snippet
    }

    let { breakpoint = 'xs', class: className = '', children }: Props = $props()
</script>

<div class={cx('grid gap-x-4 gap-y-2 whitespace-nowrap', breakpoints[breakpoint], className)}>
    {@render children?.()}
</div>
