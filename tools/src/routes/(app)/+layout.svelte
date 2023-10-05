<script lang="ts">
    import Header from '$components/Header.svelte'

    import CommunitySection from '$components/CommunitySection.svelte'
    import { Link } from '$shared/components'
    import { GITHUB_LINK } from '$shared/constants'
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-black sm:max-w-6xl sm:px-8 sm:text-lg">
    <Header />
    <slot />
    <div class="mx-auto mt-16 max-w-2xl sm:max-w-3xl">
        <CommunitySection />
        <p class="mt-16 text-center">
            The IDG Toolkit uses two licenses: CC-BY-SA-4.0 for content (except images), and
            AGPL-3.0 for software.
            <Link href={GITHUB_LINK} variant="orange" class="whitespace-nowrap"
                >Learn more on GitHub</Link
            >
        </p>
    </div>
</main>
