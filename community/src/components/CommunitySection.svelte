<script lang="ts">
    import UserGroup from '$shared/icons/UserGroup.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
</script>

<div class="mt-16 flex flex-col items-center justify-between bg-stone-50 p-4 text-stone-900">
    <UserGroup />
    <Heading size={2} class="py-2 text-center">Created by and for the community</Heading>

    <p class="px-4 pb-4 text-left">
        We’re a non-profit, open source community, always learning and improving this library,
        together. And with your help, we can make IDG.community even better!
    </p>

    <LinkButton href="/contribute" variant="inverted">How to contribute</LinkButton>
</div>
