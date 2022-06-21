import { CustomCmsField, DESCRIPTION, ID, NAME } from './shared'

export const SkillsFields: CustomCmsField[] = [
    ID,
    NAME,
    DESCRIPTION,
    {
        label: 'Category',
        name: 'category',
        widget: 'relation',
        collection: 'categories',
        value_field: 'id',
        search_fields: ['name', 'id'],
        display_fields: ['name'],
        i18n: true,
    },
]
