<script lang="ts">
    import { onKeydown } from '../utils'

    export let onToggle: () => void
    export let isOpen: boolean
</script>

<button
    class="hamburger hamburger--spring z-10 !-mr-4 justify-evenly sm:hidden"
    class:is-active={isOpen}
    on:click={onToggle}
    on:keydown={onKeydown(onToggle)}
>
    <span class="hamburger-box">
        <span class="hamburger-inner" />
    </span>
</button>
