<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import Button from '$shared/components/Button.svelte'
    import Link from '$shared/components/Link.svelte'
    import { GITHUB_ISSUES_LINK } from '$shared/constants'

    let expanded = true
    let submitted = false
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
        use:enhance={() => {
            submitted = true
            return async ({ result }) => {
                if (result.type === 'error') {
                    await applyAction(result)
                }
            }
        }}
    >
        <label for="description" class="absolute -left-full">Description</label>
        <textarea type="text" name="description" class="absolute -left-full p-2 shadow-md" />
        <label for="liked" class="font-bold">What do you like about this tool?</label>
        <textarea type="text" name="liked" bind:value={liked} class="p-2 shadow-md" />
        <label for="improve" class="font-bold">What can be improved for this tool?</label>
        <textarea type="text" name="improve" bind:value={improve} class="p-2 shadow-md" />

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
