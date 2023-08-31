<script lang="ts">
    import { derived, writable } from 'svelte/store'

    import { page } from '$app/stores'
    import { Heading, Link } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { COLORS, IDG_REPORT_PDF } from '$shared/constants'
    import { getItem } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'
    import { cx, getColor } from '$shared/utils'

    // TODO: find a way to use the page url without the store, since that causes some error
    // const url = $page.url.toString()

    export let data: PageData
    $: ({ skills, dimensions, supportedLocales } = data)

    // Maybe save the selected ID item so we can keep it selected even if the language changes.
    const selectedId = writable<Skill['id'] | Dimension['id'] | undefined>()
    const selected = derived([selectedId, page], ([id]) =>
        id ? getItem(id, { skills, dimensions }) : undefined,
    )
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="grid bg-white">
    <div class="p-2 max-w-xs">
        <div class="flex items-center justify-between shadow-md mb-2">
            <button class="hover:bg-stone-100 h-10 w-10"><Arrow left /></button>
            <LocaleSwitcher {supportedLocales} />
        </div>
        <div class="grid font-semibold text-white gap-2">
            {#each dimensions as dimension (dimension.name)}
                {@const dimensionName = COLORS[dimension.id]}
                <button
                    class={cx(
                        getColor(dimension.id),
                        'p-2 flex gap-2 items-center hover:drop-shadow-lg',
                    )}
                    on:click={() => {
                        $selectedId = dimension.id
                    }}
                >
                    <img
                        src={`/images/symbols/${dimensionName}.svg`}
                        alt={`IDG ${dimensionName} symbol`}
                        width="50"
                        height="50"
                        class="invert pointer-events-none"
                    />
                    <span>
                        {dimension.name}
                    </span>
                </button>
            {/each}
        </div>

        <div class="bg-white p-4 shadow-lg">
            <Heading size={2} class="mt-4 mb-4"
                >{$selected?.name ?? 'Inner Development Goals'}</Heading
            >
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
</div>
