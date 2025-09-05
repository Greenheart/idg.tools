<script lang="ts">
    import { browser } from '$app/environment'

    let trimmedText = $state(browser ? (sessionStorage.trimmedText ?? '') : '')
    let copied = $state(false)
    let enableAutomation = $state(true)

    $effect(() => {
        // Persist state to prevent data loss during accidental reload or navigation
        if (browser) {
            sessionStorage.trimmedText = trimmedText
        }
    })

    async function copyCleanText({
        currentTarget,
    }: {
        currentTarget: EventTarget & HTMLTextAreaElement
    }) {
        copied = false
        currentTarget.select()

        // Trim and join newlines
        trimmedText = (await navigator.clipboard.readText()).trim().split('\n').join('')

        // Copy cleaned text
        if (trimmedText.length) {
            await navigator.clipboard.writeText(trimmedText)
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
        bind:value={trimmedText}
        class="mx-auto w-full border p-4 shadow-xl"
        onclick={enableAutomation ? copyCleanText : null}
        onpaste={enableAutomation
            ? async (event) => {
                  event.preventDefault()
                  await copyCleanText(event)
              }
            : null}
        rows="6"
        autofocus
    ></textarea>

    {#if copied}
        <div class="mx-auto max-w-max bg-blue-300 px-6 py-3 text-xl text-white">
            ✅ Copied cleaned text!
        </div>
    {/if}
</div>
