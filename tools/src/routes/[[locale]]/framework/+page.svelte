<script lang="ts">
    import { writable } from 'svelte/store'

    // import { page } from '$app/stores'
    import { Heading, Link } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { IDG_REPORT_PDF } from '$shared/constants'
    import { getDimension, getSkill } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'
    import Button from '$shared/components/Button.svelte'

    // TODO: find a way to use the page url without the store, since that causes some error
    // const url = $page.url.toString()

    export let data: PageData
    $: ({ skills, dimensions, supportedLocales } = data)

    // Save selected ID so we can keep tit selected even if the language changes.
    const selected = writable<Skill | Dimension | null>()
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="grid grid-cols-[1fr_400px] bg-white">
    <div class="col-span-2 flex items-center justify-between">
        <Button size="sm"><Arrow left /></Button>
        <LocaleSwitcher {supportedLocales} />
    </div>
    <div class="bg-white p-4 shadow-lg">
        <Heading size={2} class="mt-4 mb-4">{$selected?.name ?? 'Inner Development Goals'}</Heading>
        {#if $selected}
            <p>{$selected.description}</p>
        {:else}
            <p>
                The 5 dimensions with the 23 skills and qualities. Read the full report <Link
                    href={IDG_REPORT_PDF}
                    variant="black"
                    >“Inner Development Goals: Background, method and the IDG framework”</Link
                > to learn more.
            </p>
        {/if}
    </div>
</div>
