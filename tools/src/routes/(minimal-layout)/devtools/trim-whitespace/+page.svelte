<script lang="ts">
    import { PersistedState } from 'runed'

    // Persist state to prevent data loss during accidental reload or navigation
    let trimmedText = new PersistedState('trimmedText', '', { storage: 'session' })
    let copied = $state(false)
    let enableAutomation = $state(true)

    async function copyCleanText() {
        copied = false

        // Trim and join newlines
        trimmedText.current = (await navigator.clipboard.readText()).trim().split('\n').join('')

        // Copy cleaned text
        if (trimmedText.current.length) {
            await navigator.clipboard.writeText(trimmedText.current)
            copied = true

            setTimeout(() => {
                copied = false
            }, 2000)
        }
    }
</script>

<div class="grid gap-4 px-8 py-4">
    <div>
        <h1 class="text-lg font-semibold">Paste to clean text</h1>
        <p class="pb-2 text-xs text-stone-600">
            Trim whitespace and join newlines together in a paragraph. Useful when copying from
            documents that break paragraphs into multiple lines, like some PDF:s.
        </p>
        <label>
            <input type="checkbox" bind:checked={enableAutomation} />
            Enable automated format on click and paste
        </label>
    </div>

    <!-- svelte-ignore a11y_autofocus  -->
    <textarea
        bind:value={trimmedText.current}
        class="mx-auto w-full border p-4 shadow-xl"
        onclick={enableAutomation ? copyCleanText : undefined}
        onpaste={enableAutomation
            ? async (event) => {
                  event.preventDefault()
                  await copyCleanText()
              }
            : undefined}
        rows="6"
        autofocus
    ></textarea>

    {#if copied}
        <div class="mx-auto max-w-max bg-blue-300 px-6 py-3 text-xl text-white">
            ✅ Copied cleaned text!
        </div>
    {/if}
</div>
