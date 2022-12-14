<script lang="ts" context="module">
    import type { Contributor, Dimension, Story, Tag } from '$shared/types'
    import { cx, getColor, pluralize } from '$shared/utils'
    import Link from '$shared/components/Link.svelte'
    import Tags from './Tags.svelte'
</script>

<script lang="ts">
    export let story: Story
    export let dimensions: Dimension[]
    export let contributors: Contributor[]
    export let tags: Tag[]
</script>

<div class="mt-8 flex flex-wrap gap-4 gap-x-8 bg-white p-4 shadow-xl">
    <div>
        <p class="mb-2 text-sm uppercase">Published</p>
        <p class="font-bold">
            {new Date(story.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' })}
        </p>
    </div>

    {#if contributors?.length}
        <div>
            <p class="mb-2 text-sm uppercase">
                {pluralize('Contributor', contributors.length, false)}
            </p>
            <div class="flex flex-wrap whitespace-nowrap">
                {#each contributors as { link, name }, i}
                    {@const formatted = `${name}${i < contributors.length - 1 ? ',' : ''}`}
                    {#if link}
                        <Link href={link} variant="black">{formatted}</Link>&nbsp;
                    {:else}
                        <span>{formatted}&nbsp;</span>
                    {/if}
                {/each}
            </div>
        </div>
    {/if}

    <!-- IDEA: sort dimensions so they show up in a consistent order with the IDGs. Likely do this already at build time. -->
    {#if dimensions?.length}
        <div>
            <p class="mb-2 text-sm uppercase">
                {pluralize('Dimension', dimensions.length, false)}
            </p>
            <div class="flex flex-wrap gap-1">
                {#each dimensions as dimension}
                    {@const color = getColor(dimension.id)}
                    <span class={cx('px-2 py-1 text-sm text-white', color)}>{dimension.name}</span>
                {/each}
            </div>
        </div>
    {/if}

    {#if tags?.length}
        <div>
            <p class="mb-2 text-sm uppercase">{pluralize('Tag', tags.length, false)}</p>
            <!-- IDEA: Make Tags into clickable links that navigate back to the homepage and shows the content with only that content shown -->
            <Tags {tags} size="md" class="!gap-1" />
        </div>
    {/if}
</div>
