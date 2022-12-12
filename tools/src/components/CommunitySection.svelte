<script lang="ts">
    import UserGroup from '$shared/icons/UserGroup.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import { HOW_TO_CONTRIBUTE_LINK } from '$shared/constants'
    import Link from '$shared/components/Link.svelte'
    import { FEEDBACK_FORM_LINK, SUGGEST_NEW_TOOL_LINK } from '$lib/constants'
    import ButtonGroup from '$shared/components/ButtonGroup.svelte'
</script>

<div class="flex flex-col items-center justify-between bg-stone-50 p-4 text-stone-900">
    <UserGroup />
    <Heading size={2} class="py-2 text-center">Created by and for the community</Heading>

    <p class="px-4 text-left">
        We’re a non-profit, open source community, always learning and improving this library,
        together. And with your help, we can make IDG.tools even better!
    </p>

    <ButtonGroup class="my-4">
        <LinkButton
            href={SUGGEST_NEW_TOOL_LINK}
            variant="inverted"
            class="border border-transparent">Suggest new tool</LinkButton
        >
        <LinkButton href={FEEDBACK_FORM_LINK} variant="secondary-inverted">Give feedback</LinkButton
        >
    </ButtonGroup>

    <Link href={HOW_TO_CONTRIBUTE_LINK} variant="pink">Explore more ways to contribute</Link>
</div>
