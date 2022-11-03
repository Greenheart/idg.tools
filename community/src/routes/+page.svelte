<script lang="ts">
    import Link from '$components/Link.svelte'
    import Heading from '$components/Heading.svelte'
    import { isMenuOpen } from '$lib/stores'
    import type { PageData } from './$types'

    export let data: PageData
    $: ({ content } = data)
</script>

<div class:hidden={$isMenuOpen}>
    <Heading size={1}>Change starts within</Heading>

    <Heading size={2}>Welcome to the Inner Development Goals Community!</Heading
    >

    <p>
        This is an emerging community using the IDG framework in practice to
        reach the SDGs.
    </p>

    <div class="space-y-4 py-12 text-lg sm:text-xl">
        <p>
            IDG.community is the open source toolkit for the <Link
                href="https://www.innerdevelopmentgoals.org/framework"
                class="mt-6 font-bold underline">Inner Development Goals</Link
            > (IDGs) non-profit initiative. The initiative is working to achieve
            the <Link
                href="https://sdgs.un.org/goals#goals"
                class="font-bold underline"
                >UN Sustainable Development Goals</Link
            > (SDGs) through inner development.
        </p>

        <p>
            We’re building a library of scientifically-validated methods to
            develop the skills outlined by the IDG framework. Just select which
            ones you want to practice and find tools relevant for you.
        </p>
    </div>
</div>

<Heading size={2} class="mb-4">1. Choose skills to practice</Heading>

<Heading size={2} class="mb-4 mt-16">Latest stories</Heading>
