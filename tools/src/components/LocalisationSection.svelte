<script lang="ts">
    import { UserGroup } from '$shared/icons'
    import { Heading, LinkButton, Link } from '$shared/components'
    import { CONTRIBUTE_LOCALISATION_LINK, HOW_TO_CONTRIBUTE_LINK } from '$shared/constants'
</script>

<div class="flex flex-col items-center justify-between bg-white p-4 shadow-md">
    <UserGroup />
    <Heading size={2} class="py-2 text-center">Missing your language?</Heading>

    <p class="w-full px-4 text-left">
        We’re a non-profit, open source community, always learning and improving, together. With
        your help, we could make the Inner Development Goals available in more languages and
        locales!
    </p>

    <div class="pt-2 my-4">
        <LinkButton
            href={CONTRIBUTE_LOCALISATION_LINK}
            variant="inverted"
            class="border border-transparent">Update translations</LinkButton
        >
    </div>

    <Link href={HOW_TO_CONTRIBUTE_LINK} variant="orange">Explore more ways to contribute</Link>
</div>
