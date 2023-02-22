import { CustomCmsField, DESCRIPTION, ID, NAME } from './shared'

export const SkillsFields: CustomCmsField[] = [
    ID,
    NAME,
    { ...DESCRIPTION, widget: 'text' } as CustomCmsField,
    {
        label: 'Dimension',
        name: 'dimension',
        widget: 'relation',
        collection: 'dimensions',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: true,
    },
]
