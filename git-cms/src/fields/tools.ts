import { CustomCmsField, DESCRIPTION, ID, NAME } from './shared'

export const ToolsFields: CustomCmsField[] = [
    ID,
    NAME,
    DESCRIPTION,
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
