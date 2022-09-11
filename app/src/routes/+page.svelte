<script lang="ts">
    import Skills from '$components/Skills.svelte'
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import LinkButton from '$components/LinkButton.svelte'

    import type { PageData } from './$types'
    import Arrow from '$components/icons/Arrow.svelte'
    export let data: PageData
    $: ({ content } = data)
</script>

<div class="mx-auto max-w-xl">
    <Heading size={1}>Change starts from within</Heading>

    <div class="space-y-4 py-12">
        <p>
            IDG.tools is the digital field kit for the <Link
                href="https://www.innerdevelopmentgoals.org/framework"
                class="mt-6 font-bold underline">Inner Development Goals</Link
            > (IDGs) initiative.
        </p>

        <p>
            The IDGs helps us develop the skills needed to achieve the <Link
                href="https://sdgs.un.org/goals#goals"
                class="font-bold underline"
                >UN Sustainable Development Goals</Link
            > (SDGs).
        </p>
    </div>

    <Skills {content} />
</div>

<div class="mx-auto mt-6 flex flex-col items-center space-y-6 px-8 text-center">
    <LinkButton href="/explore">Continue <Arrow /></LinkButton>
</div>
