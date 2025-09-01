<script lang="ts" module>
    // IDEA: Ideally align the enabled formatting options with the enabled formatting in the CMS editor, to make it easy to sync updates
    // The CMS config can be found in cms/src/fields/shared.ts
    type MarkdownRenderer = 'linksOnly' | 'limited' | 'article'

    import SvelteMarkdown, { allowRenderersOnly } from '@humanspeak/svelte-markdown'
    import { Link, Picture } from '$shared/components'

    const shared: Parameters<typeof allowRenderersOnly>[0] = [['link', Link]]

    const allowedRenderers: Record<MarkdownRenderer, Parameters<typeof allowRenderersOnly>[0]> = {
        linksOnly: [...shared],
        limited: [...shared, 'list', 'listitem'],
        article: [...shared, 'list', 'listitem', 'heading', 'blockquote', 'hr', ['image', Picture]],
    } as const
</script>

<script lang="ts">
    // IDEA: Maybe split classnames based on which formatting they support too. For example inverted: { article, linksOnly, limited }
    // This could reduce the number of unused classes and maybe improve maintainability for this component, showing which classes are needed for which formatting
    const variants = {
        default:
            'prose-p:text-black prose-li:text-black prose-h2:text-black prose-h3:text-black prose-h4:text-black marker:text-black prose-strong:text-black prose-em:text-black prose-hr:border-t-stone-300',
        inverted:
            'prose-p:text-white prose-li:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white marker:text-white prose-strong:text-white prose-em:text-white prose-hr:border-t-stone-300',
    }

    const baseClasses =
        'prose prose-lg lg:prose-xl prose-stone prose-p:leading-7 prose-li:my-4 prose-a:text-collaborating prose-img:w-full'
    const defaultVariant = 'default'
    const defaultRenderer: MarkdownRenderer = 'linksOnly'

    interface Props {
        variant?: keyof typeof variants
        formatting?: MarkdownRenderer
        source: string
        class?: string
    }

    let {
        variant = defaultVariant,
        formatting = defaultRenderer,
        source,
        class: className = '',
    }: Props = $props()
</script>

<div class={[baseClasses, variants[variant], className, 'break-words']}>
    <SvelteMarkdown
        {source}
        renderers={allowRenderersOnly(
            allowedRenderers[formatting] ?? allowedRenderers['linksOnly'],
        )}
    />
</div>
