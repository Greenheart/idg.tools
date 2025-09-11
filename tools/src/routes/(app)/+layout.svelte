<script lang="ts">
    import { type Snippet } from 'svelte'

    import Header from '$components/Header.svelte'
    import { Link } from '$shared/components'
    import { GITHUB_LINK, IDG_WEBSITE } from '$shared/constants'
    interface Props {
        children?: Snippet
    }

    let { children }: Props = $props()
</script>

<main class="mx-auto w-full max-w-2xl px-4 pb-16 text-black sm:max-w-6xl sm:px-8 sm:text-lg">
    <Header />
    {@render children?.()}
    <div class="mx-auto mt-16 max-w-2xl text-center sm:max-w-3xl">
        <p>
            Learn more about the <Link href={IDG_WEBSITE} variant="orange"
                >Inner Development Goals</Link
            >.
        </p>

        <p class="mt-16">
            The IDG Toolkit uses two licenses: CC-BY-SA-4.0 for content (except images), and
            AGPL-3.0 for software. Learn more on
            <Link href={GITHUB_LINK} variant="inverted" class="whitespace-nowrap">GitHub</Link>.
        </p>
    </div>
</main>
