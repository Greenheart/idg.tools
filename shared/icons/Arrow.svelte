<script lang="ts">
    interface Props {
        class?: string
        left?: boolean
        right?: boolean
    }

    let { class: className = '', left = false, right = false }: Props = $props()
</script>

<span class={[className, '!text-xl font-medium']}
    >{#if left}←{/if}{#if right}→{/if}</span
>
