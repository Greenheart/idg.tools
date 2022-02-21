import React, { Fragment, ReactElement, ReactNode } from 'react'

// Simplified renderer based on https://github.com/keystonejs/keystone/blob/main/packages/document-renderer/src/index.tsx

type Node = Element | Text

type Mark = 'bold' | 'italic'

type Element = {
    children: Node[]
    [key: string]: unknown
}

type Text = {
    text: string
    [key: string]: unknown
}

type Component<Props> = (props: Props) => ReactElement | null

type OnlyChildrenComponent =
    | Component<{ children: ReactNode }>
    | keyof JSX.IntrinsicElements

type MarkRenderers = { [Key in Mark]: OnlyChildrenComponent }

interface Renderers {
    inline: {
        link: Component<{ children: ReactNode; href: string }> | 'a'
    } & MarkRenderers
    block: {
        paragraph: Component<{ children: ReactNode }>
        blockquote: OnlyChildrenComponent
        list: Component<{
            type: 'ordered' | 'unordered'
            children: ReactElement[]
        }>
    }
}

export const defaultRenderers: Renderers = {
    inline: {
        bold: 'strong',
        italic: 'em',
        link: 'a',
    },
    block: {
        blockquote: 'blockquote',
        paragraph: ({ children }) => {
            return <p>{children}</p>
        },
        list: ({ children, type }) => {
            const List = type === 'ordered' ? 'ol' : 'ul'
            return (
                <List>
                    {children.map((x, i) => (
                        <li key={i}>{x}</li>
                    ))}
                </List>
            )
        },
    },
}

function DocumentNode({
    node: _node,
    renderers,
}: {
    node: Element | Text
    renderers: Renderers
}): ReactElement {
    if (typeof _node.text === 'string') {
        let child = <Fragment>{_node.text}</Fragment>
        ;(
            Object.keys(renderers.inline) as (keyof typeof renderers.inline)[]
        ).forEach((markName) => {
            if (markName !== 'link' && _node[markName]) {
                const Mark = renderers.inline[markName]
                child = <Mark>{child}</Mark>
            }
        })

        return child
    }
    const node = _node as Element
    const children = node.children.map((x, i) => (
        <DocumentNode node={x} renderers={renderers} key={i} />
    ))
    switch (node.type as string) {
        case 'blockquote': {
            return <renderers.block.blockquote children={children} />
        }
        case 'paragraph': {
            return <renderers.block.paragraph children={children} />
        }
        case 'ordered-list':
        case 'unordered-list': {
            return (
                <renderers.block.list
                    children={children}
                    type={
                        node.type === 'ordered-list' ? 'ordered' : 'unordered'
                    }
                />
            )
        }
        case 'link': {
            return (
                <renderers.inline.link href={node.href as string}>
                    {children}
                </renderers.inline.link>
            )
        }
    }
    return <Fragment>{children}</Fragment>
}

export type DocumentRendererProps = {
    document: Element[]
    renderers?: {
        inline?: Partial<Renderers['inline']>
        block?: Partial<Renderers['block']>
    }
}

export function DocumentRenderer(props: DocumentRendererProps) {
    const renderers = {
        inline: { ...defaultRenderers.inline, ...props.renderers?.inline },
        block: { ...defaultRenderers.block, ...props.renderers?.block },
    }
    return (
        <Fragment>
            {props.document.map((x, i) => (
                <DocumentNode node={x} renderers={renderers} key={i} />
            ))}
        </Fragment>
    )
}
