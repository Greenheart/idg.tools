<script lang="ts">
    import UserGroup from '$shared/icons/UserGroup.svelte'
    import Heading from './Heading.svelte'
    import LinkButton from './LinkButton.svelte'
    import { GITHUB_LINK } from '$lib/constants'
</script>

<div
    class="mt-16 flex flex-col items-center justify-between rounded-2xl bg-stone-50 p-4 text-stone-900"
>
    <UserGroup class="h-8 w-8" />
    <Heading size={2} class="py-2 text-center"
        >Created by and for the community</Heading
    >

    <!-- NOTE: THis is helpful for talking about the hubs community and similar, and might be useful in the future -->
    <!-- <p class="px-4 pb-4">
        IDG.tools is co-created by people from all around the world - join our
        supportive community and let's practice inner development together!
    </p> -->

    <p class="px-4 pb-4 text-left">
        We’re a non-profit, open source community, always learning and improving
        this library, together. And with your help, we can make IDG.tools even
        better!
    </p>

    <LinkButton href={GITHUB_LINK} variant="inverted">
        Contribute on GitHub
    </LinkButton>
</div>
