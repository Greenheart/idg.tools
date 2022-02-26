<script lang="ts">
    import { onMount } from 'svelte'

    import type { Content } from '$lib/types'
    import { selectedSkills } from '$lib/stores'
    import LinkButton from '$components/LinkButton.svelte'
    import Heading from '$components/Heading.svelte'
    import { COMMUNITY_LINK } from '$lib/constants'
    import Link from '$components/Link.svelte'
    import Tools from '$components/Tools.svelte'

    export let content: Content

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })
</script>

<!-- IDEA: filter tools based on related IDGs (possible to select one or multiple) -->
<!-- IDEA: add basic client side search to find relevant content -->

<Heading size={1}>My tools</Heading>

<p class="py-5">
    These are the tools we recommend based on which skills you want to practice. <Link
        href="/skills"
        variant="pink"
    >
        Change skills here
    </Link>
</p>

<Heading class="pb-5">Library</Heading>

<div class="grid gap-5">
    <Tools
        tools={$selectedSkills.length
            ? content.tools.filter((tool) =>
                  tool.skills.some((skillId) =>
                      $selectedSkills.includes(skillId),
                  ),
              )
            : content.tools}
        {content}
    />
</div>

<div
    class="mt-16 flex flex-col items-center justify-between rounded-2xl bg-stone-50 p-4 text-center text-stone-900"
>
    <Heading>Created by and for the community</Heading>

    <p class="pt-3 pb-4">
        IDG.tools is co-created by people from all around the world - join our
        supportive community and let's practice inner development together!
    </p>

    <LinkButton href={COMMUNITY_LINK} variant="inverted">
        Join community
    </LinkButton>
</div>
