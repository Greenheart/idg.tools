import { CmsFieldBase, CmsField } from 'netlify-cms-core'

export type CmsFieldUniqueId = CmsFieldBase & {
    widget: 'uniqueId'
}

export type CustomCmsField = CmsField | CmsFieldUniqueId

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

export const DESCRIPTION: CmsField = {
    label: 'Description',
    name: 'description',
    i18n: true,
    widget: 'string',
}
