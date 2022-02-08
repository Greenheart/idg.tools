<script lang="ts" context="module">
    import Modal from "$components/BaseModal.svelte"
    import Button, { ButtonProps } from "$components/Button.svelte"
</script>

<script lang="ts">
    export let title: string
    export let actions: ButtonProps[]
    // IDEA: Optionally enable closing with ESC or by clicking outside. Control with prop
</script>

<Modal class="bg-stone-700 p-8 max-w-md w-full">
    <h2 slot="header" class="font-semibold text-2xl text-center">
        {title}
    </h2>
    <div class="my-8">
        <slot />
    </div>
    <div slot="footer" class="flex justify-center flex-col space-y-2">
        {#each actions as { onClick, variant, label, autofocus }}
            <Button {label} {onClick} {variant} {autofocus} />
        {/each}
    </div>
</Modal>
