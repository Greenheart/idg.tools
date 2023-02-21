import { BaseField, Field, MarkdownField } from '@staticcms/core'

export type UniqueIdField = BaseField & {
    widget: 'uniqueId'
}

export type UniqueSlugField = BaseField & {
    widget: 'uniqueSlug'
}

export type CustomField = Field | UniqueIdField | UniqueSlugField

export const ID: UniqueIdField = {
    label: 'ID',
    name: 'id',
    widget: 'uniqueId',
    required: true,
    i18n: 'duplicate',
}

export const NAME: Field = {
    label: 'Name',
    name: 'name',
    i18n: true,
    widget: 'string',
}

export const TITLE: Field = {
    label: 'Headline',
    name: 'title',
    i18n: true,
    widget: 'string',
}

export const DESCRIPTION: Field = {
    label: 'Description',
    name: 'description',
    i18n: true,
    widget: 'string',
}

// TODO: figure out how the new editor works and how to configure it
export const MARKDOWN_LINKS_ONLY: Partial<MarkdownField & BaseField> = {
    widget: 'markdown',
    // buttons: ['link'],
    // editor_components: [],
    i18n: true,
    // minimal: true,
}

// TODO: figure out how the new editor works and how to configure it
export const MARKDOWN_MINIMAL: Partial<MarkdownField & BaseField> = {
    ...MARKDOWN_LINKS_ONLY,
    // buttons: ['bulleted-list', 'numbered-list', 'link'],
}

// TODO: figure out how the new editor works and how to configure it
export const MARKDOWN_ARTICLE: Partial<MarkdownField & BaseField> = {
    widget: 'markdown',
    // buttons: [
    //     'heading-one',
    //     'heading-two',
    //     'heading-three',
    //     'quote',
    //     'bulleted-list',
    //     'numbered-list',
    //     'link',
    // ],
    // editor_components: ['image'],
    i18n: true,
    // minimal: true,
}
