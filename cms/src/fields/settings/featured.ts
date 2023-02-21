import { CustomField } from '../shared'

// TODO: Fix bug that this doesn't show up after we changed to support multiple locales
// IDEA: Maybe we have to live with a differnent format for now instead

export const FeaturedContentFields: CustomField[] = [
    {
        name: 'stories',
        required: false,
        label: '✍️ Featured Stories',
        label_singular: 'Featured Story',
        widget: 'relation',
        multiple: true,
        collection: 'stories',
        value_field: 'id',
        search_fields: ['title', 'id'],
        display_fields: ['title'],
        hint: 'Select the stories you want to feature on the IDG.community website. You can change the order by removing and adding stories in the order you want them.',
    },
]
