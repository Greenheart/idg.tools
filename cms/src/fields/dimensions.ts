import { CustomCmsField, DESCRIPTION, ID, NAME } from './shared'

export const DimensionsFields: CustomCmsField[] = [
    NAME,
    {
        label: 'Subtitle',
        name: 'subtitle',
        i18n: true,
        widget: 'string',
    },
    { ...DESCRIPTION, widget: 'text' } as CustomCmsField,
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
    ID,
]
