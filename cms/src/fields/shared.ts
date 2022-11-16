import {
    CmsFieldBase,
    CmsField,
    CmsFieldMarkdown,
    CmsFieldFileOrImage,
} from 'netlify-cms-core'

export type CmsFieldUniqueId = CmsFieldBase & {
    widget: 'uniqueId'
}

export type CmsFieldUniqueSlug = CmsFieldBase & {
    widget: 'uniqueSlug'
}

export type CustomCmsField = CmsField | CmsFieldUniqueId | CmsFieldUniqueSlug

export const ID: CmsFieldUniqueId = {
    label: 'ID',
    name: 'id',
    widget: 'uniqueId',
    required: true,
    i18n: 'duplicate',
}

export const NAME: CmsField = {
    label: 'Name',
    name: 'name',
    i18n: true,
    widget: 'string',
}

export const TITLE: CmsField = {
    label: 'Title',
    name: 'title',
    i18n: true,
    widget: 'string',
}

export const DESCRIPTION: CmsField = {
    label: 'Description',
    name: 'description',
    i18n: true,
    widget: 'string',
}

export const IMAGE: CmsField = {
    label: 'Image',
    name: 'image',
    i18n: true,
    widget: 'object',
    required: false,
    fields: [
        {
            label: 'Image',
            name: 'src',
            widget: 'image',
            choose_url: false,
            allow_multiple: false,
            i18n: 'duplicate',
            media_folder: '/community/static/images',
        } as CmsFieldFileOrImage & CmsFieldBase,
        {
            label: 'Description (alt text)',
            hint: 'Describe what the image contains. This is important for accessibility.',
            widget: 'string',
            name: 'alt',
            i18n: true,
        },
    ],
}

export const MARKDOWN_LINKS_ONLY: Partial<CmsFieldMarkdown & CmsFieldBase> = {
    widget: 'markdown',
    buttons: ['link'],
    editor_components: [],
    i18n: true,
    minimal: true,
}

export const MARKDOWN_MINIMAL: Partial<CmsFieldMarkdown & CmsFieldBase> = {
    ...MARKDOWN_LINKS_ONLY,
    buttons: ['bulleted-list', 'numbered-list', 'link'],
}

export const MARKDOWN_ARTICLE: Partial<CmsFieldMarkdown & CmsFieldBase> = {
    widget: 'markdown',
    buttons: [
        'heading-one',
        'heading-two',
        'heading-three',
        'quote',
        'bulleted-list',
        'numbered-list',
        'link',
    ],
    editor_components: ['image'],
    i18n: true,
    minimal: true,
}
