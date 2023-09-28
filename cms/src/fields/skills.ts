import { CustomCmsField, DESCRIPTION, ID, NAME } from './shared'

export const SkillsFields: CustomCmsField[] = [
    ID,
    NAME,
    { ...DESCRIPTION, widget: 'text' } as CustomCmsField,
    {
        // TODO: create script to populate questions for skills in other locales
        label: 'Reflection questions',
        label_singular: 'Reflection question',
        name: 'questions',
        i18n: true,
        required: false,
        allow_add: false,
        collapsed: false,
        field: {
            widget: 'string',
            i18n: true,
            name: 'question',
            label: 'Reflection question',
        },
        default: [],
        widget: 'list',
    },
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
