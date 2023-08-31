<script lang="ts">
    import { writable } from 'svelte/store'

    // import { page } from '$app/stores'
    import { Heading, Link } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { COLORS, IDG_REPORT_PDF } from '$shared/constants'
    import { getDimension, getSkill } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import Arrow from '$shared/icons/Arrow.svelte'
    import Button from '$shared/components/Button.svelte'
    import { cx, getColor } from '$shared/utils'

    // TODO: find a way to use the page url without the store, since that causes some error
    // const url = $page.url.toString()

    export let data: PageData
    $: ({ skills, dimensions, supportedLocales } = data)

    // Save selected ID so we can keep tit selected even if the language changes.
    const selected = writable<Skill | Dimension>()
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="grid grid-cols-[1fr_400px] bg-white">
    <div class="col-span-2 flex items-center justify-between">
        <Button size="sm"><Arrow left /></Button>
        <LocaleSwitcher {supportedLocales} />
    </div>
    <div class="p-4">
        <!-- TODO: list all dimensions, with the correct icon -->
        <!-- TODO: list all skills in that dimension -->
        <!-- TODO: Ensure the symbols are positioned correctly, for example the acting symbol needs adjusted margin/padding -->
        <!-- Option 1 -->
        <div
            class="grid grid-cols-{dimensions.length} text-[0.625rem] tracking-tighter text-center text-white"
        >
            {#each dimensions as dimension (dimension.id)}
                {@const dimensionName = COLORS[dimension.id]}
                <div class={cx(getColor(dimension.id), 'py-2 px-1')}>
                    <img
                        src={`/images/symbols/${dimensionName}.svg`}
                        alt={`IDG ${dimensionName} symbol`}
                        width="40"
                        height="40"
                        class={cx(
                            'mx-auto invert pointer-events-none',
                            dimensionName === 'acting' ? 'translate-x-1' : undefined,
                        )}
                    />
                    <h2>{dimension.name}</h2>
                </div>
            {/each}
        </div>

        <!-- Option 2 -->
        <div class="mt-16 grid grid-cols-{dimensions.length} text-xs text-center text-white">
            {#each dimensions as dimension (dimension.id)}
                {@const dimensionName = COLORS[dimension.id]}
                <button
                    class={cx(getColor(dimension.id), 'py-2 px-1')}
                    on:click={() => {
                        $selected = dimension
                    }}
                >
                    <img
                        src={`/images/symbols/${dimensionName}.svg`}
                        alt={`IDG ${dimensionName} symbol`}
                        width="40"
                        height="40"
                        class={cx(
                            'mx-auto invert pointer-events-none',
                            dimensionName === 'acting' ? 'translate-x-1' : undefined,
                        )}
                    />
                </button>
            {/each}
            <h2 class="font-bold col-span-full text-center py-2 {getColor($selected?.id)}">
                {$selected?.name}
            </h2>
        </div>
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
