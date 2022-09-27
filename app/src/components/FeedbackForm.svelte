<script lang="ts">
    import { applyAction, enhance } from '$app/forms'
    import Button from './Button.svelte'

    let expanded = false
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
        class="grid space-y-2 text-stone-900"
        use:enhance={() => {
            submitted = true
            return async ({ result }) => {
                if (result.type === 'error') {
                    await applyAction(result)
                }
            }
        }}
    >
        <label for="description" class="absolute -left-full text-stone-50"
            >Description</label
        >
        <input type="text" name="description" class="absolute -left-full p-2" />
        <label for="liked" class="text-stone-50">What do you like?</label>
        <input type="text" name="liked" bind:value={liked} class="p-2" />
        <label for="improve" class="text-stone-50">What can be improved?</label>
        <input type="text" name="improve" bind:value={improve} class="p-2" />
        <Button
            type="submit"
            disabled={!(liked.length || improve.length)}
            class="!mt-6 justify-self-center">Submit feedback</Button
        >
    </form>
{:else}
    <div class="flex justify-center">
        <Button on:click={() => (expanded = true)}
            >Help improve this tool</Button
        >
    </div>
{/if}
