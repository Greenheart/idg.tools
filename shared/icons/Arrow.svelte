<script lang="ts">
    import { cx } from '../utils'

    let className = ''
    export { className as class }

    export let left = false
    export let right = false
</script>

<span class={cx(className, '!text-xl font-medium')}
    >{#if left}←{/if}{#if right}→{/if}</span
>
