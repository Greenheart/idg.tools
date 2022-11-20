<script lang="ts">
    import { cx } from '../utils'

    let className = ''
    export { className as class }
</script>

<span class={cx(className, '!text-xl font-medium')}>→</span>
