<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    import {
        Paragraph,
        Text,
        List,
        ListItem,
    } from 'svelte-markdown/src/renderers'
    import DOMPurify from 'dompurify'

    import Link from './Link.svelte'
    import EmptyComponent from './EmptyComponent.svelte'
    import { cx } from '$lib/utils'

    const variants = {
        default:
            'prose-p:text-stone-50 prose-li:text-stone-50 marker:text-stone-50 prose-strong:text-stone-50 prose-em:text-stone-50',
        inverted:
            'prose-p:text-stone-900 prose-li:text-stone-900 marker:text-stone-900 prose-strong:text-stone-900 prose-em:text-stone-900',
    }

    const baseClasses =
        'prose prose-stone prose-p:leading-6 prose-li:my-1 prose-a:text-thinking'
    const defaultVariant = 'default'

    export let variant: keyof typeof variants = defaultVariant
    export let source: string
    let className = ''
    export { className as class }

    const renderers = {
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
        list: List,
        listitem: ListItem,
        heading: EmptyComponent,
        codespan: EmptyComponent,
        code: EmptyComponent,
        html: EmptyComponent,
    }
</script>

<div class={cx(baseClasses, variants[variant], className, 'break-words')}>
    <SvelteMarkdown
        {source}
        {renderers}
        options={{ sanitizer: DOMPurify.sanitize }}
    />
</div>
