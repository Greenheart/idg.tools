<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    import DOMPurify from 'dompurify'

    import Link from './Link.svelte'
    import Nothing from './Nothing.svelte'
    import { cx } from '../utils'
    import Picture from './Picture.svelte'

    // IDEA: Ideally align the enabled formatting options with the enabled formatting in the CMS editor, to make it easy to sync updates
    // The CMS config can be found in cms/src/fields/shared.ts
    type MarkdownRenderer = 'linksOnly' | 'limited' | 'article'

    const getRenderers = (type: MarkdownRenderer) => {
        const shared = {
            em: Nothing,
            strong: Nothing,
            del: Nothing,
            link: Link,
            br: Nothing,
            table: Nothing,
            tablehead: Nothing,
            tablebody: Nothing,
            tablerow: Nothing,
            tablecell: Nothing,
            codespan: Nothing,
            code: Nothing,
            html: Nothing,
        }

        const linksOnly = {
            ...shared,
            hr: Nothing,
            blockquote: Nothing,
            image: Nothing,
            list: Nothing,
            listitem: Nothing,
            heading: Nothing,
        }

        const limited = {
            ...shared,
            heading: Nothing,
            blockquote: Nothing,
            hr: Nothing,
            image: Nothing,
        }
        const article = {
            ...shared,
            // IDEA: Show alt texts as image descriptions also for inline images in articles.
            image: Picture,
        }

        if (type === 'article') return article
        if (type === 'limited') return limited
        return linksOnly
    }

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
