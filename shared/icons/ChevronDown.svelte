<script lang="ts">
    import { cx } from '../utils'

    let className = ''
    export { className as class }
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="1.5"
    stroke="currentColor"
    class={cx('h-6 w-6', className)}
>
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
