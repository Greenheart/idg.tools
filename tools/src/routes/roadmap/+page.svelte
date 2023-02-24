<script lang="ts">
    import Divider from '$shared/components/Divider.svelte'
    import Heading from '$shared/components/Heading.svelte'
    import Link from '$shared/components/Link.svelte'
    import LinkButton from '$shared/components/LinkButton.svelte'
    import { HOW_TO_CONTRIBUTE_LINK } from '$shared/constants'

    const roadmap = {
        current: [
            {
                title: 'Support for translations and localization',
                description:
                    'This will make it possible to translate and localise the IDG framework and the IDG Toolkit into multiple languages and locales.',
            },
            {
                title: 'Principles and Governance for the IDG Toolkit',
                description:
                    'This is important because we want to make it easier to contribute, and have a transparent co-creation process.',
            },
        ],
        upNext: [
            {
                title: 'Improved contributor guide',
                description:
                    'We want to make it easier to get started contribute with content, design and code.',
            },
            {
                title: 'Search widget to find tools',
                description: 'This would help people find the content they want faster.',
            },
            {
                title: 'Better UX for people new to the IDG framework',
                description:
                    'The first version of the IDG Toolkit is primarily created for people who already know about the IDGs. We want to make it easy to use the IDG Toolkit even without prior knowledge.',
            },
            {
                title: 'Self assessment that recommends tools',
                description:
                    'This would make it easier to know where to get started, which IDG dimensions and skills to focus on - and which IDG tools to start with.',
            },
        ],
        future: [],
    }
</script>

<Heading size={1} class="text-collaborating">Roadmap for the IDG Toolkit</Heading>

<div class="py-12 text-lg">
    <p class="my-8">
        Here you can follow our progress, and see what we're considering for the future. Please keep
        in mind this is a community-driven project with limited resources, so if you want something
        in this roadmap to happen - you're warmly welcome to <Link
            href={HOW_TO_CONTRIBUTE_LINK}
            variant="black">join the co-creation</Link
        >. Thank you! :)
    </p>

    <Divider class="my-12" />

    <div class="space-y-8">
        <Heading class="text-collaborating">1. What we're working on</Heading>
        {#each roadmap.current as { title, description }}
            <div>
                <Heading size={3}>{title}</Heading>
                <p class="">{description}</p>
            </div>
        {/each}
    </div>

    <Divider class="my-12" />

    <div class="space-y-8">
        <Heading class="text-collaborating">2. Up next</Heading>
        {#each roadmap.upNext as { title, description }}
            <div>
                <Heading size={3}>{title}</Heading>
                <p class="">{description}</p>
            </div>
        {/each}
    </div>

    {#if roadmap.future.length}
        <Divider class="my-12" />

        <div class="space-y-8">
            <Heading class="text-collaborating">3. Future ideas</Heading>
            {#each roadmap.future as { title, description }}
                <div>
                    <Heading size={3}>{title}</Heading>
                    <p class="">{description}</p>
                </div>
            {/each}
        </div>
    {/if}
</div>

<div class="flex flex-col items-center justify-center py-12">
    <LinkButton href={HOW_TO_CONTRIBUTE_LINK} variant="secondary-inverted" size="lg"
        >I want to contribute!</LinkButton
    >
    <Link href="/" class="mt-8" variant="black">Back to IDG Toolkit</Link>
</div>

<Divider class="my-16" />
