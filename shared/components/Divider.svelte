<script lang="ts">
    import { cx } from '../utils'
    let className = ''
    export { className as class }
</script>

<div class={cx('flex items-center justify-center gap-2', className)}>
    <hr class="h-1 w-full" />
    <span>|</span>
    <span>|</span>
    <span>|</span>
    <hr class="h-1 w-full" />
</div>
