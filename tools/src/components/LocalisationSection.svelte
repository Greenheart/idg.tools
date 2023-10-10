<script lang="ts">
    import { UserGroup } from '$shared/icons'
    import { Heading, LinkButton, Link, ButtonGroup } from '$shared/components'
    import {
        CONTRIBUTE_LOCALISATION_LINK,
        HOW_TO_CONTRIBUTE_LINK,
        IDG_ONE_QUESTION_SURVEY_LINK,
    } from '$shared/constants'
</script>

<div class="flex flex-col items-center justify-between bg-white p-4 shadow-md">
    <UserGroup />
    <Heading size={2} class="py-2 text-center">Missing your language?</Heading>

    <p class="w-full px-4 text-left">
        We’re a non-profit, open source community, always learning and improving, together. With
        your help, we could make the Inner Development Goals available in more languages and
        locales!
    </p>

    <p class="px-4 pt-4">
        You can also help improve the next version of the Inner Development Goals framework by
        participating in the survey: <Link href={IDG_ONE_QUESTION_SURVEY_LINK} variant="black"
            >One Question: Global Impact</Link
        >.
    </p>

    <ButtonGroup class="my-4 pt-2" breakpoint="sm">
        <LinkButton
            href={CONTRIBUTE_LOCALISATION_LINK}
            variant="inverted"
            class="border border-transparent">Update translations</LinkButton
        >
        <LinkButton href={IDG_ONE_QUESTION_SURVEY_LINK} variant="secondary-inverted"
            >Take survey</LinkButton
        >
    </ButtonGroup>

    <Link href={HOW_TO_CONTRIBUTE_LINK} variant="orange">Explore more ways to contribute</Link>
</div>
