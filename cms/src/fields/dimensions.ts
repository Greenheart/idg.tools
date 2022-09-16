import { CustomCmsField, DESCRIPTION, ID, NAME } from './shared'

export const DimensionsFields: CustomCmsField[] = [
    ID,
    NAME,
    DESCRIPTION,
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
        max: 23,
        options_length: 23,
    },
    {
        label: 'Color',
        name: 'color',
        widget: 'hidden',
        i18n: 'duplicate',
    },
]
