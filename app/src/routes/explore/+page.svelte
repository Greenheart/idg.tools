<script lang="ts">
    import { onMount } from 'svelte'

    import { selectedSkills } from '$lib/stores'
    import Link from '$components/Link.svelte'
    import Tools from '$components/Tools.svelte'

    import type { PageData } from './$types'
    export let data: PageData
    $: ({ content } = data)

    onMount(async () => {
        selectedSkills.useLocalStorage()
    })
</script>

<p class="pb-6">
    These are the tools we recommend based on the skills you selected. <Link
        href="/#skills"
        variant="pink"
    >
        Change selected skills
    </Link>
</p>

<Tools
    tools={$selectedSkills.length
        ? content.tools.filter((tool) =>
              tool.relevancy.some(({ skill }) =>
                  $selectedSkills.includes(skill),
              ),
          )
        : content.tools}
    {content}
/>
