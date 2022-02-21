<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown'

    import {
        Em,
        Strong,
        Blockquote,
        Paragraph,
        Text,
        Link,
        List,
        Br,
        ListItem,
    } from 'svelte-markdown/src/renderers'
    import EmptyComponent from './EmptyComponent.svelte'

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

<div class={className}>
    <!-- TODO: Use https://mdsvex.com/docs#compile instead -->
    <SvelteMarkdown {source} />
</div>
