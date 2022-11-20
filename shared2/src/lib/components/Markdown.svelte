<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    import {
        Paragraph,
        Text,
        Heading,
        Blockquote,
        List,
        ListItem,
        Image,
    } from 'svelte-markdown/src/renderers'
    import DOMPurify from 'dompurify'

    import Link from './Link.svelte'
    import EmptyComponent from './EmptyComponent.svelte'
    import { cx } from '../utils'

    // TODO: Move this component to the $shared/components folder, and export the types and constants from $shared too.
    // TODO: Ideally align the enabled formatting options with the enabled formatting in the CMS editor, to make it easy to sync updates
    type MarkdownRenderer = 'linksOnly' | 'limited' | 'article'

    const getRenderers = (type: MarkdownRenderer) => {
        const linksOnly = {
            text: Text,
            paragraph: Paragraph,
            em: EmptyComponent,
            strong: EmptyComponent,
            hr: EmptyComponent,
            blockquote: EmptyComponent,
            del: EmptyComponent,
            link: Link,
            br: EmptyComponent,
            image: EmptyComponent,
            table: EmptyComponent,
            tablehead: EmptyComponent,
            tablebody: EmptyComponent,
            tablerow: EmptyComponent,
            tablecell: EmptyComponent,
            list: EmptyComponent,
            listitem: EmptyComponent,
            heading: EmptyComponent,
            codespan: EmptyComponent,
            code: EmptyComponent,
            html: EmptyComponent,
        }

        const limited = { ...linksOnly, list: List, listitem: ListItem }
        const article = {
            ...limited,
            blockquote: Blockquote,
            heading: Heading,
            image: Image,
        }

        if (type === 'article') return article
        if (type === 'limited') return limited
        return linksOnly
    }

    const variants = {
        default:
            'prose-p:text-stone-50 prose-li:text-stone-50 marker:text-stone-50 prose-strong:text-stone-50 prose-em:text-stone-50',
        inverted:
            'prose-p:text-stone-900 prose-li:text-stone-900 marker:text-stone-900 prose-strong:text-stone-900 prose-em:text-stone-900',
    }

    const baseClasses =
        'prose prose-lg lg:prose-xl prose-stone prose-p:leading-7 prose-li:my-4 prose-a:text-thinking'
    const defaultVariant = 'default'
    const defaultRenderer: MarkdownRenderer = 'linksOnly'

    export let variant: keyof typeof variants = defaultVariant
    export let formatting: MarkdownRenderer = defaultRenderer
    export let source: string
    let className = ''
    export { className as class }
</script>

<div class={cx(baseClasses, variants[variant], className, 'break-words')}>
    <SvelteMarkdown
        {source}
        renderers={getRenderers(formatting)}
        options={{ sanitizer: DOMPurify.sanitize }}
    />
</div>
