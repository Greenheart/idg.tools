<script lang="ts">
    interface Props {
        class?: string
    }

    let { class: className = '' }: Props = $props()
</script>

<div class={['flex items-center justify-center gap-2 text-black', className]}>
    <hr class="h-0.5 w-full bg-black" />
    <span>|</span>
    <span>|</span>
    <span>|</span>
    <hr class="h-0.5 w-full bg-black" />
</div>
