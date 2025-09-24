<script lang="ts">
    import type { ClassValue } from 'svelte/elements'

    interface Props {
        class?: ClassValue
    }

    let { class: className }: Props = $props()
</script>

<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke-width="1.5"
    stroke="currentColor"
    aria-hidden="true"
    class={['size-6', className]}
>
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
</svg>
