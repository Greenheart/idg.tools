<script lang="ts">
    import { cx } from '$shared/utils'

    let className = ''
    export { className as class }
</script>

<div class={cx('w-3 flex-col', className)}>
    <div class="bg-being h-16 w-3" />
    <div class="bg-thinking h-16 w-3" />
    <div class="bg-relating h-16 w-3" />
    <div class="bg-collaborating h-16 w-3" />
    <div class="bg-acting h-16 w-3" />
</div>
