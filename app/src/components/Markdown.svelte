<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'
    import {
        Em,
        Strong,
        Blockquote,
        Paragraph,
        Text,
        List,
        Br,
        ListItem,
    } from 'svelte-markdown/src/renderers'

    import Link from './Link.svelte'
    import EmptyComponent from './EmptyComponent.svelte'
    import { cx, sanitizeHTML } from '$lib/utils'

    const variants = {
        default:
            'prose-p:text-stone-50 prose-li:text-stone-50 marker:text-stone-50 prose-a:text-stone-50 prose-strong:text-stone-50 prose-em:text-stone-50',
        inverted:
            'prose-p:text-stone-900 prose-li:text-stone-900 marker:text-stone-900 prose-a:text-stone-900s prose-strong:text-stone-900 prose-em:text-stone-900',
    }

    const baseClasses = 'prose prose-stone prose-lg prose-li:my-1'
    const defaultVariant = 'default'

    export let variant: keyof typeof variants = defaultVariant
    export let source: string

    // Workaround since `class` is reserved in JS
    let className: string | undefined = undefined
    export { className as class }
    const renderers = {
        text: Text,
        paragraph: Paragraph,
        em: Em,
        strong: Strong,
        hr: EmptyComponent,
        blockquote: Blockquote,
        del: EmptyComponent,
        link: Link,
        br: Br,
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

<div class={cx(baseClasses, variants[variant], className)}>
    <SvelteMarkdown
        {source}
        {renderers}
        options={{ sanitizer: sanitizeHTML }}
    />
</div>
