<script lang="ts">
    import { cx } from '$shared/utils'

    let className = ''
    export { className as class }
</script>

<div class={cx('gradient h-80 w-3 flex-col', className)} />

<style>
    .gradient {
        background: linear-gradient(
            to bottom,
            var(--being) 0%,
            var(--being) 20%,
            var(--thinking) 20%,
            var(--thinking) 40%,
            var(--relating) 40%,
            var(--relating) 60%,
            var(--collaborating) 60%,
            var(--collaborating) 80%,
            var(--acting) 80%,
            var(--acting) 100%
        );
    }
</style>
