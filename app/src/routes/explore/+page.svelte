<script lang="ts">
    import { onMount } from 'svelte'

    import { selectedSkills } from '$lib/stores'
    import Heading from '$components/Heading.svelte'
    import Link from '$components/Link.svelte'
    import Tools from '$components/Tools.svelte'
    import UserGroup from '$components/icons/UserGroup.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ content } = data)

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })
</script>

<!-- IDEA: filter tools based on related IDGs (possible to select one or multiple) -->
<!-- IDEA: add basic client side search to find relevant content -->

<p class="pb-6">
    These are the tools we recommend based on the skills you selected. <Link
        href="/#skills"
        variant="pink"
    >
        Change selected skills
    </Link>
</p>

<div class="grid gap-5">
    <Tools
        tools={$selectedSkills.length
            ? content.tools.filter((tool) =>
                  tool.relevancy.some(({ skill }) =>
                      $selectedSkills.includes(skill.id),
                  ),
              )
            : content.tools}
    />
</div>

<div
    class="mt-16 flex flex-col items-center justify-between rounded-2xl bg-stone-50 p-4 text-left text-stone-900"
>
    <UserGroup class="h-8 w-8" />
    <Heading size={3} class="py-2">Created by and for the community</Heading>

    <p class="px-4 pb-4">
        IDG.tools is co-created by people from all around the world - join our
        supportive community and let's practice inner development together!
    </p>

    <!-- <LinkButton href={COMMUNITY_LINK} variant="inverted">
        Join community
    </LinkButton> -->
</div>
