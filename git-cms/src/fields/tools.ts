import { CustomCmsField, ID, MARKDOWN_FIELD, NAME } from './shared'

export const ToolsFields: CustomCmsField[] = [
    ID,
    NAME,
    {
        label: 'Description',
        name: 'description',
        i18n: true,
        ...MARKDOWN_FIELD,
    },
    {
        label: 'Skills',
        name: 'skills',
        multiple: true,
        widget: 'relation',
        collection: 'skills',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: true,
    },
    {
        label: 'Tags',
        name: 'tags',
        multiple: true,
        widget: 'relation',
        collection: 'tags',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: true,
    },
]

/**
 * TODO:
 *
 * - slug field for the permanent ending to the link
 * - link for storing the slugified name + slug that will be used to link to the tool
 */
