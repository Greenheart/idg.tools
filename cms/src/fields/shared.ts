import { CmsFieldBase, CmsField, CmsFieldMarkdown } from 'netlify-cms-core'

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

export const MARKDOWN_FIELD: Partial<CmsFieldMarkdown> = {
    widget: 'markdown',
    buttons: ['bulleted-list', 'numbered-list', 'link'],
    editor_components: [],
    minimal: true,
}
