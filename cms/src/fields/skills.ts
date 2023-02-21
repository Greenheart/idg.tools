import { CustomField, DESCRIPTION, ID, NAME } from './shared'

export const SkillsFields: CustomField[] = [
    ID,
    NAME,
    DESCRIPTION,
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
