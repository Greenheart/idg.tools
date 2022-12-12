<script lang="ts">
    import { cx } from '../utils'
    let className = ''
    export { className as class }
</script>

<div class={cx('flex items-center justify-center gap-2 text-black', className)}>
    <hr class="h-0.5 w-full bg-black" />
    <span>|</span>
    <span>|</span>
    <span>|</span>
    <hr class="h-0.5 w-full bg-black" />
</div>
