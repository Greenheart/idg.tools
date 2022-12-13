<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    import {
        Paragraph,
        Text,
        Heading,
        Blockquote,
        List,
        ListItem,
    } from 'svelte-markdown/src/renderers'
    import DOMPurify from 'dompurify'

    import Link from './Link.svelte'
    import EmptyComponent from './EmptyComponent.svelte'
    import { cx } from '../utils'
    import Picture from './Picture.svelte'

    // IDEA: Ideally align the enabled formatting options with the enabled formatting in the CMS editor, to make it easy to sync updates
    // The CMS config can be found in cms/src/fields/shared.ts
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
            // IDEA: Show alt texts as image descriptions also for inline images in articles.
            // TODO: try if we can use the <Picture /> component here to add improved loading strategies for image formats
            // This should be possible since we just need to support the props from the Image component.
            image: Picture,
        }

        if (type === 'article') return article
        if (type === 'limited') return limited
        return linksOnly
    }

    const variants = {
        default:
            'prose-p:text-black prose-li:text-black prose-h2:text-black prose-h3:text-black prose-h4:text-black marker:text-black prose-strong:text-black prose-em:text-black',
        inverted:
            'prose-p:text-white prose-li:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white marker:text-white prose-strong:text-white prose-em:text-white',
    }

    const baseClasses =
        'prose prose-lg lg:prose-xl prose-stone prose-p:leading-7 prose-li:my-4 prose-a:text-collaborating prose-img:w-full'
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
