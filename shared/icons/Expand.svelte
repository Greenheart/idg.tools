<script lang="ts">
    import { cx } from '../utils'

    export let open = false
</script>

<svg
    class={cx(
        'h-6 w-6 transform text-black transition duration-150',
        open ? 'rotate-45' : 'rotate-0',
    )}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
>
    <path
        fill-rule="evenodd"
        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
        clip-rule="evenodd"
    />
</svg>
