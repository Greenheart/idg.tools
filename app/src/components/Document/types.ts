export type Node = Element | Text

export const Marks = ['bold', 'italic'] as const
export type Mark = typeof Marks[number]

export type Element = {
    children: Node[]
    [key: string]: unknown
}

export type Text = {
    text: string
    [key: string]: unknown
}
