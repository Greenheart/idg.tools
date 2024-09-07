<script lang="ts">
    import { UserGroup } from '$shared/icons'
    import { Heading, LinkButton, Link, ButtonGroup } from '$shared/components'
    import { IDG_WEBSITE } from '$shared/constants'
    import { FEEDBACK_FORM_LINK, SUGGEST_NEW_TOOL_LINK } from '$lib/constants'
</script>

<div class="flex flex-col items-center justify-between bg-white p-4 shadow-md">
    <UserGroup />
    <Heading size={2} class="py-2 text-center">Created by and for the community</Heading>

    <p class="w-full px-4 text-left">
        We’re a non-profit, open source community, always learning and improving this library,
        together. And with your help, we can make the IDG Toolkit even better!
    </p>

    <ButtonGroup class="my-4" breakpoint="sm">
        <LinkButton
            href={SUGGEST_NEW_TOOL_LINK}
            variant="inverted"
            class="border border-transparent">Suggest new tool</LinkButton
        >
        <LinkButton href={FEEDBACK_FORM_LINK} variant="secondary-inverted">Give feedback</LinkButton
        >
    </ButtonGroup>

    <Link href={IDG_WEBSITE} variant="orange">Learn more about the Inner Development Goals</Link>
</div>
