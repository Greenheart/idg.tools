<script lang="ts">
    import { browser } from '$app/environment'

    let trimmedText = $state<string>(browser ? (sessionStorage.trimmedText ?? '') : '')
    let copied = $state(false)
    let enableAutomation = $state(true)
    let replace = $state<'empty' | 'space'>('space')

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

        try {
            // Trim and join newlines
            const cleaned = (await navigator.clipboard.readText())
                .trim()
                .split('\n')
                .join(replace === 'empty' ? '' : ' ')

            // // Useful for strings where there should be a dot at the end
            // trimmedText = cleaned.endsWith('.') ? cleaned : cleaned + '.'

            trimmedText = cleaned

            // Copy cleaned text
            if (trimmedText.length) {
                await navigator.clipboard.writeText(trimmedText)
                copied = true

                setTimeout(() => {
                    copied = false
                }, 2000)
            }
        } catch (error) {
            // Ignore error when the user cancels the Clipboard read access for this specific interaction
        }
    }
</script>

<div class="grid gap-4 px-8 py-4">
    <div class="select-none text-sm">
        <h1 class="text-lg font-semibold">Paste to clean text</h1>
        <p class="pb-2 text-xs text-stone-600">
            Trim whitespace and join newlines together in a paragraph. Useful when copying from
            documents that break paragraphs into multiple lines, like some PDF:s.
        </p>
        <label class="cursor-pointer py-1">
            <input type="checkbox" bind:checked={enableAutomation} />
            Enable automated format on click and paste.
        </label>
        <p class="pt-2">
            Replace <code
                class="inline-flex items-center whitespace-pre-line rounded-sm bg-stone-700 px-1 font-mono text-white"
                >\n</code
            >
            with:
            <label class="cursor-pointer py-1">
                <input type="radio" name="replace" value="space" bind:group={replace} />
                <code
                    class="inline-flex items-center whitespace-pre-line rounded-sm bg-stone-700 px-1 font-mono text-white"
                    >&quot;&nbsp&quot;</code
                > (space)
            </label>
            <label class="cursor-pointer py-1">
                <input type="radio" name="replace" value="empty" bind:group={replace} />
                <code
                    class="inline-flex items-center whitespace-pre-line rounded-sm bg-stone-700 px-1 font-mono text-white"
                    >&quot;&quot;</code
                > (empty string)
            </label>
        </p>
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
