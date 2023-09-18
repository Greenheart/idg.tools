<script lang="ts">
    import { Button, Link } from '$shared/components'
    import { GITHUB_ISSUES_LINK } from '$shared/constants'

    let expanded = false
    let submitted = false
    let description = ''
    let liked = ''
    let improve = ''
</script>

{#if submitted}
    <div class="flex justify-center">
        <p>Thanks for your feedback!</p>
    </div>
{:else if expanded}
    <form
        method="POST"
        class="grid space-y-2 text-black"
        on:submit|preventDefault={async () => {
            submitted = true
            await fetch('/api/feedback', {
                method: 'POST',
                body: JSON.stringify({ description, liked, improve }),
            }).catch(console.error)
        }}
    >
        <label for="description" class="absolute -left-full">Description</label>
        <textarea
            name="description"
            bind:value={description}
            class="absolute -left-full p-2 shadow-md"
        />
        <label for="liked" class="font-bold">What do you like about this tool?</label>
        <textarea name="liked" bind:value={liked} class="p-2 shadow-md" />
        <label for="improve" class="font-bold">What can be improved for this tool?</label>
        <textarea name="improve" bind:value={improve} class="p-2 shadow-md" />

        <p class="py-4 text-sm">
            Please note that your feedback will be public on <Link
                href={GITHUB_ISSUES_LINK}
                variant="black">GitHub</Link
            >, since we work in the open.
        </p>

        <Button
            type="submit"
            variant="secondary"
            disabled={!(liked.length && improve.length)}
            class="justify-self-center">Submit feedback</Button
        >
    </form>
{:else}
    <div class="flex justify-center">
        <Button on:click={() => (expanded = true)}>Give feedback on this tool</Button>
    </div>
{/if}
