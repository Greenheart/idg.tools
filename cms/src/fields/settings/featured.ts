import { CustomCmsField } from '../shared'

export const FeaturedContentFields: CustomCmsField[] = [
    // TODO: Can the order of the output from the relation widget be trusted to be consistent?
    // If not, we might need to use the `list` widget type
    // NOTE: Maybe it's easier to sort stories with the list widget than with the relation directly.
    // If we want to use the list widget instead, we should move the relation widget as the only content in there.
    {
        label: 'Featured Stories',
        label_singular: 'Featured Story',
        name: 'stories',
        hint: 'Select the stories you want to feature on the IDG.community website.',
        widget: 'list',
        required: false,
        field: {
            name: 'id',
            label: 'Featured Story',
            widget: 'relation',
            collection: 'stories',
            value_field: 'id',
            search_fields: ['name', 'id'],
            display_fields: ['name'],
            i18n: 'duplicate',
            required: true,
        },
    },
]
