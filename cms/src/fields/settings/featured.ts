import { CustomCmsField } from '../shared'

export const FeaturedContentFields: CustomCmsField[] = [
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
