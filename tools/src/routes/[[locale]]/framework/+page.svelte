<script lang="ts">
    import { derived, writable } from 'svelte/store'

    import { page } from '$app/stores'
    import { Heading, Link } from '$shared/components'
    import Meta from '$components/Meta.svelte'
    import type { PageData } from './$types'
    import { COLORS, IDG_REPORT_PDF } from '$shared/constants'
    import { getDimension, getItem, getSkill, getSkillsInDimension } from '$shared/content-utils'
    import type { Dimension, Skill } from '$shared/types'
    import LocaleSwitcher from '$shared/components/LocaleSwitcher.svelte'
    import { Arrow } from '$shared/icons'
    import { cx, getColor } from '$shared/utils'

    export let data: PageData
    $: ({ skills, dimensions, supportedLocales } = data)

    const selectedSkillId = writable<Skill['id'] | undefined>()
    const selectedDimensionId = writable<Dimension['id'] | undefined>()

    // Derive from page store to keep selection even when the page language changes
    const selectedSkill = derived([selectedSkillId, page], ([id]) =>
        id ? getSkill(id as unknown as Skill['id'], { skills }) : undefined,
    )
    const selectedDimension = derived([selectedDimensionId, page], ([id]) =>
        id ? getDimension(id as unknown as Dimension['id'], { dimensions }) : undefined,
    )

    function onBack() {
        if ($selectedSkillId) {
            $selectedSkillId = undefined
        } else if ($selectedDimensionId) {
            $selectedDimensionId = undefined
        }
    }
</script>

<Meta title="IDG Framework" description="The 5 dimensions with the 23 skills and qualities" />

<div class="grid bg-white">
    <div class="p-2 max-w-xs text-base">
        <div class="flex items-center justify-between shadow-md mb-2">
            {#if $selectedDimensionId}
                <button class="hover:bg-stone-100 h-10 w-10" on:click={onBack}>
                    <Arrow left /></button
                >
            {:else}
                <div />
            {/if}
            <LocaleSwitcher {supportedLocales} />
        </div>

        {#if !$selectedDimension}
            <div class="grid font-semibold text-white gap-2 leading-5">
                {#each dimensions as dimension (dimension.name)}
                    {@const dimensionName = COLORS[dimension.id]}
                    <button
                        class={cx(
                            getColor(dimension.id),
                            'p-2 flex gap-2 items-center hover:drop-shadow-lg text-left',
                        )}
                        on:click={() => {
                            $selectedDimensionId = dimension.id
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
        {:else if !$selectedSkill}
            <div class="grid font-semibold text-white gap-2 leading-5">
                {#each getSkillsInDimension( $selectedDimension.id, { skills }, ) as skill (skill.name)}
                    <!-- TODO: Replace with the skill symbols -->
                    {@const dimensionName = COLORS[skill.id]}
                    <button
                        class={cx(
                            getColor(skill.id),
                            'p-2 flex gap-2 items-center hover:drop-shadow-lg text-left',
                        )}
                        on:click={() => {
                            $selectedSkillId = skill.id
                        }}
                    >
                        <img
                            src={`/images/symbols/${dimensionName}.svg`}
                            alt={`IDG ${dimensionName} symbol`}
                            width="50"
                            height="50"
                            class="invert pointer-events-none"
                        />
                        <p>
                            {skill.name}
                        </p>
                    </button>
                {/each}
            </div>
        {/if}

        <div class="bg-white p-4 shadow-lg">
            {#if $selectedSkill}
                <Heading size={2} class="mt-4 mb-4">{$selectedSkill?.name}</Heading>
                <p>{$selectedSkill.description}</p>
            {:else if $selectedDimension}
                <Heading size={2} class="mt-4 mb-4">{$selectedDimension?.name}</Heading>
                <p>{$selectedDimension.description}</p>
            {:else}
                <Heading size={2} class="mt-4 mb-4">Inner Development Goals</Heading>
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
