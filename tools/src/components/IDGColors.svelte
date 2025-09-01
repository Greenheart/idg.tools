<script lang="ts">
    interface Props {
        class?: string
    }

    let { class: className = '' }: Props = $props()
</script>

<div class={['gradient h-80 w-3 flex-col', className]}></div>

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
