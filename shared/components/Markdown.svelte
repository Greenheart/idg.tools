<script lang="ts" module>
    import SvelteMarkdown, { excludeRenderersOnly } from '@humanspeak/svelte-markdown'
    import Link from './Link.svelte'
    import Picture from './Picture.svelte'

    const alwaysDisabledRenderers: Parameters<typeof excludeRenderersOnly>[0] = [
        'table',
        'tablehead',
        'tablebody',
        'tablerow',
        'tablecell',
        'br',
        'code',
        'codespan',
        'del',
        'em',
        'escape',
        'strong',
    ]

    // Formatting options should reflect what is enabled in the CMS editor.
    // The CMS config can be found in cms/src/fields/shared.ts
    const renderers = {
        linksOnly: excludeRenderersOnly(
            [
                ...alwaysDisabledRenderers,
                'list',
                'listitem',
                'orderedlistitem',
                'unorderedlistitem',

                'blockquote',
                'heading',
                'hr',
                'image',
            ],
            [['link', Link]],
        ),
        limited: excludeRenderersOnly(
            [...alwaysDisabledRenderers, 'blockquote', 'heading', 'hr', 'image'],
            [['link', Link]],
        ),
        article: excludeRenderersOnly(alwaysDisabledRenderers, [
            ['link', Link],
            ['image', Picture],
        ]),
    } as const
</script>

<script lang="ts">
    const variants = {
        default:
            'prose-p:text-black prose-li:text-black prose-h2:text-black prose-h3:text-black prose-h4:text-black marker:text-black prose-hr:border-t-stone-300',
        inverted:
            'prose-p:text-white prose-li:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white marker:text-white prose-hr:border-t-stone-300',
    }

    interface Props {
        variant?: keyof typeof variants
        formatting?: keyof typeof renderers
        source: string
        class?: string
    }

    let {
        variant = 'default',
        formatting = 'linksOnly',
        source,
        class: className = '',
    }: Props = $props()
</script>

<div
    class={[
        'prose prose-lg lg:prose-xl prose-stone prose-p:leading-7 prose-li:my-4 prose-a:text-collaborating prose-img:w-full',
        variants[variant],
        className,
        'break-words',
    ]}
>
    <SvelteMarkdown {source} renderers={renderers[formatting] ?? renderers['linksOnly']} />
</div>
